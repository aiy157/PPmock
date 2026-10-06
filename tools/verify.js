// ตัวตรวจสอบคลังข้อสอบ: node tools/verify.js [questions/part1.js ...]
// - ตรวจโครงสร้างของทุกข้อ (id ไม่ซ้ำ, มี 4 ตัวเลือก, answer อยู่ในช่วง, ตัวเลือกไม่ซ้ำกัน)
// - ข้อที่ตั้ง run: true จะถูกนำ code ไปรันด้วย Python จริง แล้วเทียบผลกับตัวเลือกที่เฉลย
//   * ถ้ามี errorType (เช่น "TypeError") ต้องรันแล้ว error และ stderr มีชื่อนั้น
//   * ถ้าไม่มี stdout (trim) ต้องตรงกับ choices[answer] (trim) และต้องไม่ตรงกับตัวเลือกอื่น
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const os = require("os");
const { spawnSync } = require("child_process");

const root = path.join(__dirname, "..");
let files = process.argv.slice(2);
if (files.length === 0) {
  const dir = path.join(root, "questions");
  files = fs.readdirSync(dir).filter(f => f.endsWith(".js")).sort().map(f => path.join(dir, f));
}

const sandbox = { window: {} };
vm.createContext(sandbox);
const owner = new Map();
for (const f of files) {
  const before = (sandbox.window.QUESTION_BANK || []).length;
  vm.runInContext(fs.readFileSync(f, "utf8"), sandbox, { filename: f });
  const after = sandbox.window.QUESTION_BANK || [];
  for (let i = before; i < after.length; i++) owner.set(after[i], path.basename(f));
}
const bank = sandbox.window.QUESTION_BANK || [];
const norm = s => String(s).replace(/\r\n/g, "\n").split("\n").map(l => l.replace(/\s+$/, "")).join("\n").trim();

let errors = 0, ran = 0;
const ids = new Set();
const tmp = path.join(os.tmpdir(), "kw_verify.py");
const fail = (q, msg) => { errors++; console.log(`✗ [${owner.get(q)}] ${q.id}: ${msg}`); };

for (const q of bank) {
  if (!q.id || ids.has(q.id)) fail(q, "id ว่างหรือซ้ำ");
  ids.add(q.id);
  if (!q.cat || !q.q || !q.explain) fail(q, "ขาด cat/q/explain");
  if (!Array.isArray(q.choices) || q.choices.length !== 4) { fail(q, "ต้องมี 4 ตัวเลือก"); continue; }
  if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4)) fail(q, "answer ต้องเป็น 0-3");
  if (new Set(q.choices.map(norm)).size !== 4) fail(q, "มีตัวเลือกซ้ำกัน");
  if (!q.run) continue;
  if (!q.code) { fail(q, "run: true แต่ไม่มี code"); continue; }
  fs.writeFileSync(tmp, q.code, "utf8");
  const r = spawnSync("python", [tmp], { encoding: "utf8", timeout: 10000, env: { ...process.env, PYTHONIOENCODING: "utf-8" } });
  ran++;
  if (q.errorType) {
    if (r.status === 0 || !String(r.stderr).includes(q.errorType)) fail(q, `คาดว่าจะเกิด ${q.errorType} แต่ได้ status=${r.status} stderr=${norm(r.stderr).split("\n").pop()}`);
    continue;
  }
  if (r.status !== 0) { fail(q, `รันแล้ว error: ${norm(r.stderr).split("\n").pop()}`); continue; }
  const out = norm(r.stdout);
  if (out !== norm(q.choices[q.answer])) fail(q, `เฉลย=${JSON.stringify(q.choices[q.answer])} แต่ Python ได้ ${JSON.stringify(out)}`);
  q.choices.forEach((c, i) => { if (i !== q.answer && norm(c) === out) fail(q, `ตัวเลือก ${i} ก็ตรงกับผลรันด้วย`); });
}

const cats = {};
bank.forEach(q => cats[q.cat] = (cats[q.cat] || 0) + 1);
console.log(`\nทั้งหมด ${bank.length} ข้อ | รันด้วย Python ${ran} ข้อ | ผิดพลาด ${errors}`);
console.log(cats);
process.exit(errors ? 1 : 0);
