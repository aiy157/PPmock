/* KW Mock Exam — ระบบทำข้อสอบจำลองหลายวิชา (Python & Introduction to Engineering) */
(() => {
  "use strict";

  const KEYS = ["ก", "ข", "ค", "ง"];
  const SEC_PER_Q = 90;
  const PASS_PCT = 50;

  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
  const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmtTime = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const rich = s => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");

  /* ---------------- Subjects Configuration ---------------- */
  const SUBJECTS = {
    python: {
      id: "python",
      name: "Computer Programming (Python)",
      short: "Python",
      logo: "🐍",
      brandTitle: "KW-Python Mock Exam",
      brandSub: "แนวข้อสอบ กว. · Computer Programming",
      heroTitle: 'ข้อสอบจำลอง กว. <span class="accent">ภาษา Python</span>',
      heroDesc: "ฝึกทำข้อสอบแนวสภาวิศวกร วิชา Computer Programming พร้อมเฉลยและคำอธิบายละเอียดทุกข้อ โค้ดทุกข้อที่ถามผลลัพธ์ผ่านการรันตรวจด้วย Python จริง",
      getBank: () => (window.QUESTION_BANK || []).slice(),
      counts: ["20", "50", "100", "all"],
      defaultCount: "50",
      hasCode: true
    },
    intro_en: {
      id: "intro_en",
      name: "Introduction to Engineering",
      short: "Intro to EN",
      logo: "⚙️",
      brandTitle: "Introduction to Engineering",
      brandSub: "แนะนำวิชาชีพวิศวกรรม & เกณฑ์เลือกสาขา",
      heroTitle: 'แบบทดสอบ <span class="accent">Introduction to Engineering</span>',
      heroDesc: "แบบทดสอบรายวิชาแนะนำวิชาชีพวิศวกรรม ครอบคลุมหลักเกณฑ์การเลือกสาขาวิชา (ปี 2569), เมคาทรอนิกส์, AI, อุตสาหการ, เคมี, สิ่งแวดล้อม, โยธา, เครื่องกล, ไฟฟ้า และกระบวนการออกแบบเชิงวิศวกรรม พร้อมเฉลยละเอียด",
      getBank: () => (window.INTRO_EN_BANK || []).slice(),
      counts: ["10", "20", "30", "all"],
      defaultCount: "all",
      hasCode: false
    }
  };

  let currentSubject = load("kw_subject", "python");
  if (!SUBJECTS[currentSubject]) currentSubject = "python";

  const getActiveSub = () => SUBJECTS[currentSubject];
  const getActiveBank = () => getActiveSub().getBank();
  const getByIdMap = () => new Map(getActiveBank().map(q => [q.id, q]));

  const lsKey = k => `kw_${k}_${currentSubject}`;

  /* ---------------- Python syntax highlight ---------------- */
  const KW = new Set("False None True and as assert break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield".split(" "));
  const BI = new Set("print len range int float str list dict set tuple type input sum min max abs sorted round map filter zip enumerate bool isinstance super open reversed chr ord bin hex oct pow divmod any all id format repr object Exception ValueError TypeError ZeroDivisionError IndexError KeyError NameError self".split(" "));
  const TOKEN = /(#.*$)|([rbfRBF]{0,2}"(?:\\.|[^"\\])*"|[rbfRBF]{0,2}'(?:\\.|[^'\\])*')|(\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b)|([A-Za-z_]\w*)|([+\-*/%=<>!&|^~]+)/g;
  function highlightLine(line) {
    let out = "", last = 0;
    line.replace(TOKEN, (m, com, str, num, word, op, idx) => {
      out += esc(line.slice(last, idx));
      if (com) out += `<span class="tk-com">${esc(m)}</span>`;
      else if (str) out += `<span class="tk-str">${esc(m)}</span>`;
      else if (num) out += `<span class="tk-num">${esc(m)}</span>`;
      else if (word) out += KW.has(m) ? `<span class="tk-kw">${m}</span>` : BI.has(m) ? `<span class="tk-bi">${m}</span>` : esc(m);
      else out += `<span class="tk-op">${esc(m)}</span>`;
      last = idx + m.length;
      return m;
    });
    return out + esc(line.slice(last));
  }
  const highlight = code => code.replace(/\r\n/g, "\n").replace(/\n+$/, "").split("\n")
    .map(l => `<span class="ln">${highlightLine(l) || " "}</span>`).join("");

  /* ---------------- views ---------------- */
  function show(view) {
    $$(".view").forEach(v => v.classList.add("hidden"));
    $(`#view-${view}`).classList.remove("hidden");
    window.scrollTo({ top: 0 });
  }

  /* ---------------- theme ---------------- */
  if (load("kw_theme", "dark") === "light") document.documentElement.classList.add("light");
  $("#themeBtn").onclick = () => {
    const light = document.documentElement.classList.toggle("light");
    save("kw_theme", light ? "light" : "dark");
  };

  /* ================= HOME ================= */
  const settings = { mode: "practice", count: "50" };

  function segment(el, key, onChange) {
    el.addEventListener("click", e => {
      const b = e.target.closest("button[data-v]");
      if (!b) return;
      el.querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b));
      if (key) settings[key] = b.dataset.v;
      onChange && onChange(b.dataset.v);
    });
  }

  segment($("#modeSeg"), "mode", v => { $("#timerOpt").classList.toggle("hidden", v !== "exam"); });
  $("#timerOpt").classList.toggle("hidden", settings.mode !== "exam");
  segment($("#countSeg"), "count");

  segment($("#subjectSeg"), null, v => {
    if (v === currentSubject) return;
    currentSubject = v;
    save("kw_subject", currentSubject);
    settings.count = SUBJECTS[currentSubject].defaultCount;
    renderHome();
  });

  function renderHome() {
    const sub = getActiveSub();
    const bank = sub.getBank();
    const byId = new Map(bank.map(q => [q.id, q]));
    const cats = [...new Set(bank.map(q => q.cat))];
    const catCount = c => bank.filter(q => q.cat === c).length;

    // Header branding
    $("#brandLogo").textContent = sub.logo;
    $("#brandTitle").textContent = sub.brandTitle;
    $("#brandSub").textContent = sub.brandSub;

    // Hero title & desc
    $("#heroTitle").innerHTML = sub.heroTitle;
    $("#heroDesc").textContent = sub.heroDesc;

    // Subject toggle state
    $$("#subjectSeg button").forEach(b => b.classList.toggle("active", b.dataset.v === currentSubject));

    // Stats
    const runCount = bank.filter(q => q.run).length;
    let statsHTML = `
      <div class="stat"><b>${bank.length}</b><span>ข้อสอบในวิชานี้</span></div>
      <div class="stat"><b>${cats.length}</b><span>หมวดเนื้อหา</span></div>`;
    if (sub.hasCode) {
      statsHTML += `<div class="stat"><b>${runCount}</b><span>ข้อโค้ดที่ตรวจด้วย Python จริง</span></div>`;
    } else {
      statsHTML += `<div class="stat"><b>100%</b><span>พร้อมเฉลยและเหตุผลละเอียด</span></div>`;
    }
    $("#homeStats").innerHTML = statsHTML;

    // Count selector buttons
    $("#countSeg").innerHTML = sub.counts.map(c => `
      <button data-v="${c}" class="${c === settings.count ? "active" : ""}">${c === "all" ? "ทั้งหมด" : c}</button>
    `).join("");

    // Category list checkboxes
    $("#catList").innerHTML = cats.map(c =>
      `<label class="check"><input type="checkbox" value="${esc(c)}" checked> ${esc(c)} <small>(${catCount(c)})</small></label>`
    ).join("");

    // Wrong questions
    const wrong = load(lsKey("wrong"), []).filter(id => byId.has(id));
    $("#wrongCount").textContent = `(${wrong.length})`;
    $("#wrongBtn").disabled = wrong.length === 0;

    // History
    const hist = load(lsKey("hist"), []);
    $("#history").innerHTML = hist.length ? hist.slice(0, 8).map(h => `
      <div class="hist">
        <span>${new Date(h.date).toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" })}<br>
          <small class="muted">${h.mode === "exam" ? "สอบจำลอง" : "ฝึกฝน"} · ${h.total} ข้อ · ${fmtTime(h.sec)}</small></span>
        <span class="score ${h.pct >= PASS_PCT ? "pass" : "fail"}">${h.correct}/${h.total} (${h.pct}%)</span>
      </div>`).join("") : `<p class="muted">ยังไม่มีประวัติการสอบของวิชานี้ — เริ่มทำข้อสอบชุดแรกได้เลย!</p>`;

    // Resume session if available
    const s = load(lsKey("session"), null);
    if (s && !s.submitted && s.subject === currentSubject && s.ids.every(id => byId.has(id))) {
      $("#history").insertAdjacentHTML("afterbegin",
        `<div class="hist"><span>มีชุดข้อสอบที่ทำค้างไว้ (${Object.keys(s.answers).length}/${s.ids.length} ข้อ)</span>
         <button class="btn primary small" id="resumeBtn">ทำต่อ</button></div>`);
      $("#resumeBtn").onclick = () => { session = s; startQuiz(); };
    }

    show("home");
  }

  $("#catAll").onclick = () => $$("#catList input").forEach(i => i.checked = true);
  $("#catNone").onclick = () => $$("#catList input").forEach(i => i.checked = false);
  $("#clearHist").onclick = () => { if (confirm(`ล้างประวัติการสอบของวิชา ${getActiveSub().short} ทั้งหมด?`)) { save(lsKey("hist"), []); renderHome(); } };
  $("#brandLink").onclick = e => { e.preventDefault(); if (confirmLeave()) renderHome(); };

  $("#startBtn").onclick = () => {
    const bank = getActiveBank();
    const cats = $$("#catList input:checked").map(i => i.value);
    let pool = bank.filter(q => cats.includes(q.cat));
    if (!pool.length) return alert("กรุณาเลือกอย่างน้อย 1 หมวด");
    if ($("#optShuffle").checked) shuffle(pool);
    if (settings.count !== "all") pool = pool.slice(0, +settings.count);
    newSession(pool.map(q => q.id), settings.mode);
  };

  $("#wrongBtn").onclick = () => {
    const byId = getByIdMap();
    const ids = shuffle(load(lsKey("wrong"), []).filter(id => byId.has(id)));
    if (ids.length) newSession(ids, "practice");
  };

  /* ================= QUIZ ================= */
  let session = null, tick = null;

  function newSession(ids, mode) {
    const timed = mode === "exam" && $("#optTimer").checked;
    session = {
      subject: currentSubject,
      ids, mode, cur: 0, answers: {}, flags: [], revealed: [],
      start: Date.now(), limit: timed ? ids.length * SEC_PER_Q : 0, submitted: false,
    };
    persist();
    startQuiz();
  }
  const persist = () => session && save(lsKey("session"), session);

  function startQuiz() {
    $("#submitBtn").textContent = session.mode === "exam" ? "ส่งคำตอบ" : "จบการฝึก";
    show("quiz");
    renderQuestion();
    clearInterval(tick);
    tick = setInterval(updateTimer, 1000);
    updateTimer();
  }

  function elapsed() { return Math.floor((Date.now() - session.start) / 1000); }
  function updateTimer() {
    if (!session || session.submitted) return clearInterval(tick);
    const t = $("#timer");
    if (session.limit) {
      const left = session.limit - elapsed();
      t.textContent = `⏱ ${fmtTime(Math.max(0, left))}`;
      t.classList.toggle("low", left <= 60);
      if (left <= 0) { alert("หมดเวลา! ระบบจะส่งคำตอบอัตโนมัติ"); submit(true); }
    } else {
      t.textContent = `⏱ ${fmtTime(elapsed())}`;
      t.classList.remove("low");
    }
  }

  function choiceHTML(q, i, cls, disabled) {
    const mono = q.code ? " mono" : "";
    return `<button class="choice ${cls}" data-i="${i}" ${disabled ? "disabled" : ""}>
      <span class="key">${KEYS[i]}</span><span class="ctext${mono}">${esc(q.choices[i])}</span></button>`;
  }

  function getQuestion(id) {
    const bank = (SUBJECTS[session.subject] || getActiveSub()).getBank();
    return bank.find(q => q.id === id);
  }

  function renderQuestion() {
    const idx = session.cur, q = getQuestion(session.ids[idx]);
    if (!q) return;
    const sel = session.answers[idx];
    const revealed = session.mode === "practice" && session.revealed.includes(idx);
    const n = session.ids.length;

    $("#qCounter").textContent = `ข้อ ${idx + 1}/${n}`;
    $("#qCat").textContent = `${SUBJECTS[session.subject]?.short || ""} · ${q.cat}`;
    $("#qId").textContent = q.id;
    $("#progressFill").style.width = `${(Object.keys(session.answers).length / n) * 100}%`;
    $("#qText").innerHTML = rich(q.q);
    $("#qCode").classList.toggle("hidden", !q.code);
    $("#qCode").innerHTML = q.code ? highlight(q.code) : "";
    $("#flagBtn").classList.toggle("on", session.flags.includes(idx));

    $("#qChoices").innerHTML = q.choices.map((_, i) => {
      let cls = "";
      if (revealed) cls = i === q.answer ? "correct" : i === sel ? "wrong" : "";
      else if (i === sel) cls = "selected";
      return choiceHTML(q, i, cls, revealed);
    }).join("");

    const ex = $("#qExplain");
    if (revealed) {
      const ok = sel === q.answer;
      const isLast = idx === n - 1;
      const btnLabel = isLast ? "📊 จบชุด & สรุปคะแนน →" : "👉 ข้อถัดไป →";
      ex.className = `explain ${ok ? "ok" : "bad"}`;
      ex.innerHTML = `
        <div class="verdict">${ok ? "✅ ถูกต้อง!" : `❌ ยังไม่ถูก — คำตอบที่ถูกคือ ${KEYS[q.answer]}`}</div>
        <div class="explain-text">${rich(q.explain)}</div>
        <div class="explain-action">
          <button class="btn primary" id="expNextBtn">${btnLabel}</button>
        </div>`;
      $("#expNextBtn").onclick = () => go(idx + 1);
    } else ex.className = "explain hidden";

    $("#prevBtn").disabled = idx === 0;
    $("#nextBtn").textContent = idx === n - 1 ? (session.mode === "exam" ? "ส่งคำตอบ ✓" : "จบการฝึก & ดูคะแนน ✓") : "ถัดไป →";
    renderNav();
  }

  function renderNav() {
    const byId = getByIdMap();
    $("#qNav").innerHTML = session.ids.map((id, i) => {
      const c = [];
      const q = getQuestion(id);
      if (session.mode === "practice" && session.revealed.includes(i)) c.push(session.answers[i] === q?.answer ? "correct" : "wrong");
      else if (i in session.answers) c.push("answered");
      if (session.flags.includes(i)) c.push("flagged");
      if (i === session.cur) c.push("current");
      return `<button class="${c.join(" ")}" data-i="${i}">${i + 1}</button>`;
    }).join("");
    const cur = $("#qNav .current");
    cur && cur.scrollIntoView({ block: "nearest" });
  }

  function choose(i) {
    const idx = session.cur, q = getQuestion(session.ids[idx]);
    if (session.mode === "practice") {
      if (session.revealed.includes(idx)) return;
      session.revealed.push(idx);
      trackWrong(q.id, i === q.answer);
    }
    session.answers[idx] = i;
    persist();
    renderQuestion();
    if (session.mode === "practice") {
      setTimeout(() => {
        $("#qExplain")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 40);
    }
  }

  function go(i) {
    if (i < 0) return;
    if (i >= session.ids.length) return submit(false);
    session.cur = i;
    persist();
    renderQuestion();
    window.scrollTo({ top: $("#view-quiz").offsetTop - 20, behavior: "smooth" });
  }

  $("#qChoices").addEventListener("click", e => { const b = e.target.closest(".choice"); if (b && !b.disabled) choose(+b.dataset.i); });
  $("#qNav").addEventListener("click", e => { const b = e.target.closest("button"); if (b) go(+b.dataset.i); });
  $("#prevBtn").onclick = () => go(session.cur - 1);
  $("#nextBtn").onclick = () => go(session.cur + 1);
  $("#submitBtn").onclick = () => submit(false);
  $("#flagBtn").onclick = toggleFlag;
  $("#quitBtn").onclick = () => { if (confirmLeave()) renderHome(); };

  function toggleFlag() {
    const i = session.cur, f = session.flags;
    f.includes(i) ? f.splice(f.indexOf(i), 1) : f.push(i);
    persist();
    renderQuestion();
  }

  function confirmLeave() {
    if (!session || session.submitted || $("#view-quiz").classList.contains("hidden")) return true;
    const ok = confirm("ออกจากการสอบ? (ความคืบหน้าจะถูกบันทึกไว้ สามารถกลับมาทำต่อได้)");
    if (ok) clearInterval(tick);
    return ok;
  }

  document.addEventListener("keydown", e => {
    if ($("#view-quiz").classList.contains("hidden") || e.ctrlKey || e.metaKey || e.altKey) return;
    if (["1", "2", "3", "4"].includes(e.key)) choose(+e.key - 1);
    else if (e.key === "ArrowRight") go(session.cur + 1);
    else if (e.key === "ArrowLeft") go(session.cur - 1);
    else if (e.key.toLowerCase() === "f") toggleFlag();
  });

  function trackWrong(id, correct) {
    const key = lsKey("wrong");
    const w = new Set(load(key, []));
    correct ? w.delete(id) : w.add(id);
    save(key, [...w]);
  }

  /* ================= RESULT ================= */
  function submit(force) {
    const n = session.ids.length, answered = Object.keys(session.answers).length;
    if (!force) {
      const msg = answered < n ? `ยังไม่ได้ตอบ ${n - answered} ข้อ ต้องการส่งคำตอบเลยหรือไม่?` : "ยืนยันการส่งคำตอบ?";
      if (!confirm(msg)) return;
    }
    clearInterval(tick);
    session.submitted = true;
    session.sec = session.limit ? Math.min(elapsed(), session.limit) : elapsed();
    let correct = 0;
    session.ids.forEach((id, i) => {
      const q = getQuestion(id);
      const ok = session.answers[i] === q?.answer;
      if (ok) correct++;
      if (session.mode === "exam") trackWrong(id, ok);
      else if (!(i in session.answers)) trackWrong(id, false);
    });
    session.correct = correct;
    const pct = Math.round((correct / n) * 100);
    const hist = load(lsKey("hist"), []);
    hist.unshift({ date: Date.now(), mode: session.mode, total: n, correct, pct, sec: session.sec });
    save(lsKey("hist"), hist.slice(0, 30));
    localStorage.removeItem(lsKey("session"));
    renderResult();
  }

  let reviewFilter = "all";
  function renderResult() {
    const n = session.ids.length, c = session.correct, pct = Math.round((c / n) * 100);
    const pass = pct >= PASS_PCT;
    const ring = $("#scoreRing");
    ring.style.setProperty("--p", pct);
    ring.style.setProperty("--c", pass ? "var(--ok)" : "var(--bad)");
    $("#scorePct").textContent = `${pct}%`;
    $("#resultTitle").textContent = pct >= 80 ? "ยอดเยี่ยม! 🎉" : pass ? "ผ่านเกณฑ์ 👍" : "ยังไม่ผ่านเกณฑ์ — สู้ต่อ! 💪";
    const unanswered = n - Object.keys(session.answers).length;
    $("#resultDetail").innerHTML = `วิชา: <b>${SUBJECTS[session.subject]?.name || ""}</b><br>
      ตอบถูก <b>${c}</b> จาก <b>${n}</b> ข้อ · ผิด ${n - c - unanswered} · ไม่ตอบ ${unanswered}
      · ใช้เวลา ${fmtTime(session.sec)}<br><small>เกณฑ์อ้างอิงในระบบ: ${PASS_PCT}%</small>`;
    $("#retryWrongBtn").disabled = c === n;

    const stat = {};
    session.ids.forEach((id, i) => {
      const q = getQuestion(id);
      if (!q) return;
      stat[q.cat] = stat[q.cat] || { t: 0, c: 0 };
      stat[q.cat].t++;
      if (session.answers[i] === q.answer) stat[q.cat].c++;
    });
    $("#catBreakdown").innerHTML = Object.entries(stat).map(([cat, s]) => {
      const p = Math.round((s.c / s.t) * 100);
      const col = p >= 70 ? "var(--ok)" : p >= PASS_PCT ? "var(--warn)" : "var(--bad)";
      return `<div class="bar-row"><span>${esc(cat)}</span><div class="bar"><div style="width:${p}%;background:${col}"></div></div><span class="num">${s.c}/${s.t}</span></div>`;
    }).join("");

    reviewFilter = "all";
    $$("#reviewFilter button").forEach(b => b.classList.toggle("active", b.dataset.v === "all"));
    renderReview();
    show("result");
  }

  function questionBlock(q, num, sel, opts = {}) {
    const ok = sel === q.answer, skipped = sel === undefined;
    const badge = opts.noBadge ? "" : skipped ? `<span class="badge skip">ไม่ได้ตอบ</span>` : ok ? `<span class="badge ok">ถูก</span>` : `<span class="badge bad">ผิด</span>`;
    const hide = opts.hideAnswer;
    const choices = q.choices.map((_, i) => {
      let cls = "";
      if (!hide) cls = i === q.answer ? "correct" : i === sel ? "wrong" : "";
      return choiceHTML(q, i, cls, true);
    }).join("");
    const answerBox = `<div class="explain ok"><div class="verdict">เฉลย: ${KEYS[q.answer]}. ${esc(q.choices[q.answer]).replace(/\n/g, " ⏎ ")}</div>${rich(q.explain)}</div>`;
    return `<div class="review-item" data-id="${q.id}">
      <div class="rhead"><span><b>ข้อ ${num}</b> <span class="qid">${q.id}</span> <span class="pill">${esc(q.cat)}</span></span>${badge}</div>
      <div class="qtext">${rich(q.q)}</div>
      ${q.code ? `<pre class="code">${highlight(q.code)}</pre>` : ""}
      <div class="choices">${choices}</div>
      ${hide ? `<button class="btn ghost small reveal">👁 แสดงเฉลย</button><div class="ans hidden">${answerBox}</div>` : answerBox}
    </div>`;
  }

  function renderReview() {
    const html = session.ids.map((id, i) => {
      const q = getQuestion(id);
      if (!q) return "";
      const sel = session.answers[i], ok = sel === q.answer;
      if (reviewFilter === "wrong" && ok) return "";
      if (reviewFilter === "right" && !ok) return "";
      return questionBlock(q, i + 1, sel);
    }).join("");
    $("#reviewList").innerHTML = html || `<p class="muted">ไม่มีข้อในตัวกรองนี้</p>`;
  }
  segment($("#reviewFilter"), null, v => { reviewFilter = v; renderReview(); });

  $("#retryBtn").onclick = () => newSession(shuffle(session.ids.slice()), session.mode);
  $("#retryWrongBtn").onclick = () => {
    const ids = session.ids.filter((id, i) => session.answers[i] !== getQuestion(id)?.answer);
    if (ids.length) newSession(ids, "practice");
  };
  $("#homeBtn").onclick = renderHome;

  /* ================= BROWSE ================= */
  function populateBrowseCats() {
    const bank = getActiveBank();
    const cats = [...new Set(bank.map(q => q.cat))];
    const catCount = c => bank.filter(q => q.cat === c).length;
    $("#browseCat").innerHTML = `<option value="">ทุกหมวด (${bank.length})</option>` +
      cats.map(c => `<option value="${esc(c)}">${esc(c)} (${catCount(c)})</option>`).join("");
  }

  function renderBrowse() {
    const bank = getActiveBank();
    const term = $("#browseSearch").value.trim().toLowerCase();
    const cat = $("#browseCat").value;
    const hide = $("#browseHide").checked;
    const list = bank.filter(q => (!cat || q.cat === cat) &&
      (!term || (q.q + " " + (q.code || "") + " " + q.choices.join(" ") + " " + q.id).toLowerCase().includes(term)));
    $("#browseCount").textContent = `วิชา: ${getActiveSub().name} · แสดง ${list.length} ข้อ`;
    $("#browseList").innerHTML = list.map((q, i) => questionBlock(q, i + 1, undefined, { noBadge: true, hideAnswer: hide })).join("");
  }

  $("#browseBtn").onclick = () => { populateBrowseCats(); renderBrowse(); show("browse"); };
  $("#browseBack").onclick = renderHome;
  $("#browseSearch").oninput = renderBrowse;
  $("#browseCat").onchange = renderBrowse;
  $("#browseHide").onchange = renderBrowse;
  $("#browseList").addEventListener("click", e => {
    const b = e.target.closest(".reveal");
    if (!b) return;
    const item = b.closest(".review-item");
    const q = getByIdMap().get(item.dataset.id);
    if (!q) return;
    item.querySelector(".ans").classList.remove("hidden");
    item.querySelectorAll(".choice").forEach((c, i) => c.classList.toggle("correct", i === q.answer));
    b.remove();
  });

  /* ---------------- init ---------------- */
  renderHome();
})();
