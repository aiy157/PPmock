const fs = require('fs');
const vm = require('vm');
const path = require('path');

const dir = path.join(__dirname, '..', 'questions');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();
const sandbox = { window: {} };
vm.createContext(sandbox);

for (const f of files) {
  vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), sandbox);
}

const out = {
  python: sandbox.window.QUESTION_BANK || [],
  intro_en: sandbox.window.INTRO_EN_BANK || []
};

process.stdout.write(JSON.stringify(out));
