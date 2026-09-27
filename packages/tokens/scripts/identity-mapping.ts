/**
 * Generates docs/IDENTITY-MAPPING.md from the token sources of truth.
 * Run: yarn workspace @blog/tokens run docs:mapping
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  blogCssVariables,
  blogReducedMotionVariables,
  brandRamp,
  fluentMapping,
  fluidSize,
  identity,
  RAMP_MAX_DARKEN,
  RAMP_MAX_LIGHTEN,
} from '../src/index';

const out = join(import.meta.dirname, '..', '..', '..', 'docs', 'IDENTITY-MAPPING.md');
const rows: string[] = [];
const push = (...lines: string[]) => rows.push(...lines);
const esc = (v: string) => v.replace(/\|/g, '\\|');
const src = (s: { file: string; line: number }) =>
  s.line > 0 ? `${s.file.split('/').pop()}:${s.line}` : s.file.split('/').pop();

push(
  '# Identity mapping — ZIP → tokens → Fluent',
  '',
  '> Gerado por `packages/tokens/scripts/identity-mapping.ts` — não editar à mão.',
  '> Fontes: [handoff](sources/design-system-zip/handoff-spec-onboarding-patterns.md), [brand kit](sources/brand-kit/brand/palette.json).',
  '> Decisões e conflitos: [GAPS.md](GAPS.md).',
  '',
  '## Regras aplicadas',
  '',
  '- **IC1:** cor primária `#0A63C9` (decisão do usuário).',
  `- **IC2:** faixas de tamanho → \`clamp()\` entre 768 e 1024 px (ex.: 14–16px → \`${fluidSize({ min: 14, max: 16 })}\`); faixas de motion → limite superior por padrão, inferior com \`prefers-reduced-motion: reduce\`.`,
  `- **IG3:** ramp de 16 tons derivado em OKLab: tom 80 = primária; tons escuros misturam até ${RAMP_MAX_DARKEN * 100}% de preto (tom 10); tons claros até ${RAMP_MAX_LIGHTEN * 100}% de branco (tom 160). Status: \`derived\`.`,
  '- **IG2:** tokens Fluent não listados abaixo mantêm o valor de `createLightTheme(brandRamp)` — a identidade é silente sobre eles (line-height, stroke widths, durations Fluent etc.). Sem tema dark.',
  '',
  '## 1. Tokens da identidade',
  '',
  '| Token | Grupo | Valor especificado | Status | Fonte | Refs |',
  '| --- | --- | --- | --- | --- | --- |',
);
for (const [groupName, group] of Object.entries(identity)) {
  for (const token of Object.values(group) as {
    name: string;
    status: string;
    source: { file: string; line: number; spec: string };
    refs?: readonly string[];
  }[]) {
    push(
      `| \`${token.name}\` | ${groupName} | ${esc(token.source.spec)} | ${token.status} | ${src(token.source)} | ${(token.refs ?? []).join(', ')} |`,
    );
  }
}

push('', '## 2. Mapeamento semântico para Fluent (overrides)', '', '| Token Fluent | Token da identidade | Valor | Justificativa |', '| --- | --- | --- | --- |');
for (const m of fluentMapping) {
  push(`| \`${m.fluentToken}\` | \`${m.identityToken}\` | \`${esc(m.value)}\` | ${m.rationale} |`);
}

push('', '## 3. Ramp de marca derivado (IG3)', '', '| Tom | Valor |', '| --- | --- |');
for (const [tone, value] of Object.entries(brandRamp)) push(`| ${tone} | \`${value}\`${tone === '80' ? ' (primária)' : ''} |`);

push('', '## 4. CSS custom properties próprias (`--blog-*`)', '', '| Variável | Valor | Reduced motion |', '| --- | --- | --- |');
for (const [name, value] of Object.entries(blogCssVariables)) {
  push(`| \`${name}\` | \`${esc(value)}\` | ${blogReducedMotionVariables[name] ? `\`${blogReducedMotionVariables[name]}\`` : ''} |`);
}
push('');

writeFileSync(out, rows.join('\n'));
console.log(`wrote ${out}`);
