/**
 * Creates README.md / STATUS.md (and declared contract files) for every
 * AIKB-0003 node that does not have them yet. Never overwrites existing files.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseAikb, realPath, REPO_ROOT } from './aikb';
import { specFor } from './catalog';

const TODAY = '2026-09-27';
let created = 0;

const write = (file: string, content: string) => {
  if (existsSync(file)) return;
  writeFileSync(file, content);
  created++;
};

for (const node of parseAikb()) {
  const path = realPath(node.path);
  const dir = join(REPO_ROOT, path);
  const spec = specFor(node);
  mkdirSync(dir, { recursive: true });

  const gaps = spec.gaps.length ? spec.gaps.join(', ') : '—';
  write(
    join(dir, 'README.md'),
    [
      `# ${node.path}/`,
      '',
      `**Responsabilidade:** ${spec.responsibility}`,
      '',
      `- Item AIKB-0003: \`${node.path}/\``,
      `- Autoridade: ADR-005 (arquitetura alvo), ADR-006 (materialização integral)`,
      `- GAPs: ${gaps} (ver \`docs/GAPS.md\`)`,
      '',
    ].join('\n'),
  );
  write(
    join(dir, 'STATUS.md'),
    [
      `# STATUS — ${node.path}/`,
      '',
      '| Campo | Valor |',
      '| --- | --- |',
      `| Item AIKB-0003 | \`${node.path}/\` |`,
      `| Caminho real | \`${path}/\` |`,
      `| Status | ${spec.status} |`,
      `| GAPs | ${gaps} |`,
      `| Evidência | ${spec.evidence} |`,
      `| Atualizado | ${TODAY} |`,
      '',
    ].join('\n'),
  );
  for (const [name, content] of Object.entries(spec.files ?? {})) write(join(dir, name), content);
}

console.log(`scaffold: ${created} file(s) created`);
