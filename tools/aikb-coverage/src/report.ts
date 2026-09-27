/**
 * Writes docs/architecture/aikb-0003-coverage.md and fails when any AIKB-0003
 * item is not represented (ADR-006 acceptance criterion).
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { AIKB_FILE, REPO_ROOT } from './aikb';
import { computeCoverage } from './coverage';

const rows = computeCoverage();
const covered = rows.filter((r) => r.status !== 'MISSING');
const count = (s: string) => rows.filter((r) => r.status === s).length;
const pct = ((covered.length / rows.length) * 100).toFixed(1);

const lines = [
  '# Matriz de cobertura — AIKB-0003',
  '',
  '> Gerada por `yarn nx run @blog/aikb-coverage:report` — não editar à mão.',
  `> Fonte: [\`${AIKB_FILE}\`](../../${AIKB_FILE}). Critério: [ADR-006](../decisions/ADR-006-full-target-materialization.md).`,
  '',
  `**Cobertura: ${covered.length}/${rows.length} itens (${pct}%)** — IMPLEMENTED ${count('IMPLEMENTED')} · SCAFFOLDED ${count('SCAFFOLDED')} · BLOCKED ${count('BLOCKED')} · MISSING ${count('MISSING')}`,
  '',
  '| # | ITEM AIKB-0003 | CAMINHO REAL | STATUS | EVIDÊNCIA |',
  '| --- | --- | --- | --- | --- |',
  ...rows.map(
    (r, i) =>
      `| ${i + 1} | \`${r.item}/\` | [\`${r.path}/\`](../../${r.path}/STATUS.md) | ${r.status} | ${r.problems.length ? r.problems.join('; ') : r.evidence.replace(/\|/g, '\\|')} |`,
  ),
  '',
];

writeFileSync(join(REPO_ROOT, 'docs/architecture/aikb-0003-coverage.md'), lines.join('\n'));
console.log(`AIKB-0003 coverage: ${covered.length}/${rows.length} (${pct}%)`);
if (covered.length !== rows.length) {
  for (const r of rows.filter((x) => x.status === 'MISSING'))
    console.error(`MISSING ${r.item}: ${r.problems.join(', ')}`);
  process.exit(1);
}
