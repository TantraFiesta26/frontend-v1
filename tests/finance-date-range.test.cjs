const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const ts = require('typescript');

const file = path.resolve(__dirname, '../src/lib/finances.ts');
const source = fs.readFileSync(file, 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const financeModule = new Module(file, module);
financeModule.filename = file;
financeModule.paths = module.paths;
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (parent === financeModule && request === './admin') return {};
  return originalLoad.call(this, request, parent, isMain);
};
try { financeModule._compile(compiled, file); }
finally { Module._load = originalLoad; }

const { filterFinanceEntries, financeEventLabel } = financeModule.exports;
const entry = (paidAt, createdAt = paidAt) => ({ paidAt, createdAt });
const localTime = (day, hour, minute = 0, second = 0) =>
  new Date(2026, 10, day, hour, minute, second).toISOString();

test('date range includes the full end date and excludes the next day', () => {
  const entries = [
    entry(localTime(1, 0)),
    entry(localTime(1, 23, 59, 59)),
    entry(localTime(2, 0)),
  ];
  assert.deepEqual(filterFinanceEntries(entries, '2026-11-01', '2026-11-01'), entries.slice(0, 2));
});

test('open range and manual payment creation-date fallback', () => {
  const entries = [
    entry(null, localTime(1, 12)),
    entry(localTime(2, 12)),
  ];
  assert.deepEqual(filterFinanceEntries(entries, '', ''), entries);
  assert.deepEqual(filterFinanceEntries(entries, '', '2026-11-01'), entries.slice(0, 1));
  assert.deepEqual(filterFinanceEntries(entries, '2026-11-02', ''), entries.slice(1));
});

test('event heading shows the configured per-person or flat fee', () => {
  const event = { name: 'Competition', price: 250, isTeamEvent: false, feeMode: 'per_team' };
  assert.equal(financeEventLabel(event), 'Competition (₹250 per person)');
  assert.equal(financeEventLabel({ ...event, isTeamEvent: true, feeMode: 'per_participant' }), 'Competition (₹250 per person)');
  assert.equal(financeEventLabel({ ...event, isTeamEvent: true, feeMode: 'per_team' }), 'Competition (₹250 flat)');
});
