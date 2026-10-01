# DESIGN_SYSTEM

Apontador da fonte de verdade do design system deste repositório (ADR-DS-ROOT-MIGRATION-001).
O registro legível por máquina está em `design-system.manifest.json`.

| Campo                | Valor                                      |
| -------------------- | ------------------------------------------ |
| SOURCE_REPOSITORY    | `executar-23/Risco-cognitivo-blog`         |
| SOURCE_BRANCH        | `main` (ver nota abaixo)                   |
| SOURCE_COMMIT        | `530afe1708ed24111f9b6756948908ab7e9b3afe` |
| CANONICAL_TOKEN_FILE | n/a                                        |
| COMPONENT_DIRECTORY  | n/a                                        |
| DESIGN_SYSTEM_ROUTE  | n/a                                        |
| CLASSIFICATION       | `BLOCKED`                                  |
| INTEGRATION_STATUS   | `BLOCKED`                                  |
| LAST_SYNC            | 2026-10-01                                 |
| TARGET_COMMIT_BEFORE | `445d80b901890ff89462c80764b6ae732ca41da3` |

> Nota sobre a branch: em 2026-10-01 a default branch do GitHub da origem era
> `claude/youthful-archimedes-qksrsl` (`11f78e4`), ancestral direto da `main` (`530afe1`, 7 commits
> à frente). A `main` é a branch de integração declarada no `CLAUDE.md` da origem e traz a versão
> mais nova do design system (tokens `--area-*`, `ScrollArea` com `viewportProps`), por isso é a
> fonte usada aqui.

## Inventário

Monorepo Nx + Yarn 4. Frontend em `apps/web` (Next.js 16 App Router, React 19) com
`@blog/design-system` (Fluent UI React v9 + Griffel) e `@blog/tokens` (`@fluentui/tokens`,
identidade extraída de `docs/sources/design-system-zip/handoff-spec-onboarding-patterns.md`).
Global entrypoint: `apps/web/src/app/providers.tsx` (`BlogProvider` = `FluentProvider` +
variáveis `--blog-*`). Sem Tailwind, sem shadcn/Radix, sem `components.json`. ESLint proíbe
literal visual fora de `@blog/tokens`; CI roda `format:check`, `lint typecheck test build`, E2E
com axe e confere artefatos gerados (`docs/IDENTITY-MAPPING.md`).

## Por que BLOCKED

O `ADR-001-frontend-design-system-stack.md` (Accepted, 2026-09-27) fixa a stack (Fluent UI v9 +
Griffel + `@fluentui/tokens`) e a identidade visual (handoff de onboarding, primário #1F5ECC por
decisão IC1b). O design system canônico é Tailwind 4 + shadcn/Radix com outra paleta e outra
tipografia. Torná-lo o default aqui significa substituir a identidade e a stack decididas no
ADR-001 — mudança de arquitetura que o ADR-DS-ROOT-MIGRATION-001 proíbe fazer sem ADR
("criar uma segunda paleta sem ADR", "substituir componentes existentes sem análise"). Por isso
nenhum token, componente ou rota foi alterado.

## Mapa de tokens (`@blog/tokens` → canônico)

| Token aqui                                                         | Token canônico                         | Decisão proposta                                           |
| ------------------------------------------------------------------ | -------------------------------------- | ---------------------------------------------------------- |
| `brand_blue` #1F5ECC (primário, IC1b)                              | `--primary` #0A6FDB                    | REPLACE — exige ADR que substitua o ADR-001                |
| `color-primary-blue` #0A63C9                                       | `--primary` / `--color-brand-*`        | MAP — idem                                                 |
| `color-accent-red` #D93341                                         | `--color-critical-default` (#A33A32)   | MAP — idem                                                 |
| `color-text-primary` / `color-text-secondary`                      | `--foreground` / `--muted-foreground`  | MAP                                                        |
| `color-surface` / `color-surface-muted`                            | `--card` / `--muted`                   | MAP                                                        |
| `color-border`, `board_line`, `color-calendar-gridline`            | `--border`                             | MAP                                                        |
| `color-teams-badge` #5B5FC7, `color-marketing-cta-primary` #2547E0 | sem equivalente                        | DEPRECATE — matizes fora das 3 famílias (ADR-03 da origem) |
| `color-success-check` #2E7D32                                      | sem equivalente                        | DEPRECATE ou nova família via ADR                          |
| `radius-sm/md/lg`, `spacing-*`                                     | `--radius-*`, `--spacing`              | MAP                                                        |
| `fontFamilies` (Fluent)                                            | `--font-sans` (DM Sans), `--font-mono` | REPLACE — exige ADR                                        |

## Caminho para desbloquear

1. ADR neste repositório que substitua (ou emende) o ADR-001 escolhendo a identidade canônica.
2. Gerar o tema Fluent a partir dos tokens canônicos em `@blog/tokens` (ramp da família brand,
   neutros e famílias attention/critical), mantendo Fluent UI e Griffel — sem introduzir
   Tailwind/shadcn.
3. Portar `AsciiDiagram`/`PlainTextPanel` (React + CSS puro) e o `Callout` para
   `@blog/design-system` com Griffel.
4. Criar `apps/web/src/app/admin/design-system/page.tsx` e trocar `INTEGRATION_STATUS` para
   `IMPLEMENTED_DEFAULT`.

## Fonte canônica (na origem)

| Item               | Caminho em `executar-23/Risco-cognitivo-blog` |
| ------------------ | --------------------------------------------- |
| Tokens             | `src/styles/global.css`                       |
| Primitives         | `src/components/ui/`                          |
| Plain text / ASCII | `src/components/plain/`, `src/lib/plain/`     |
| Normas             | `docs/design-system/`                         |
| Catálogo           | `/admin/design-system`                        |
