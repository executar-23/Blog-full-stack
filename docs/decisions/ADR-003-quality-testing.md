# ADR-003 — Qualidade e testes

Status: Accepted
Data: 2026-09-27

## Decisões

| Camada           | Ferramenta                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Unit/integration | Jest 30 + `@swc/jest` + React Testing Library + `jest-axe`                                                                                       |
| E2E              | Playwright (`@playwright/test`) + `@axe-core/playwright`                                                                                         |
| Storybook smoke  | Playwright contra o Storybook estático (`storybook-static`)                                                                                      |
| Lint             | ESLint flat config + `typescript-eslint` + `eslint-config-next` (apps Next) + `eslint-config-prettier`                                           |
| Formatação       | Prettier                                                                                                                                         |
| Tipos            | `tsc --noEmit` por projeto (TypeScript strict)                                                                                                   |
| CI               | GitHub Actions: `yarn install --immutable`, `nx run-many -t lint typecheck test build`, Storybook, E2E, migration, cobertura AIKB, build Workers |

## Divergências registradas

- **C2:** ADR-001 cita Cypress "quando necessário"; o pedido original especifica Playwright. Playwright substitui Cypress.
- **C10:** ESLint 10 é a última versão, mas `eslint-config-next@16.3.6` depende de `eslint-plugin-react@7.37.5`, `eslint-plugin-import@2.32.0` e `eslint-plugin-jsx-a11y@6.10.2`, cujos peers aceitam no máximo ESLint 9. Fixado `eslint@9.39.5` para não suprimir conflito de peer.
- **C1:** TypeScript 7.0.2 é a última versão, mas `typescript-eslint@8.70.1` exige `<6.1.0`. Fixado `typescript@6.0.3`.
- Jest roda TypeScript via `@swc/jest` (sem `ts-jest`); por isso `@nx/jest` (peer `ts-jest`) não é usado — os alvos Nx vêm dos scripts de cada `package.json`.
- **C12:** `@nx/eslint-plugin@23.2.1` depende de `@nx/devkit`/`@nx/js` sem declarar os peers `nx`, `eslint` e `typescript` que eles exigem (YN0086). Removido para manter a instalação sem avisos de peer; fronteiras entre projetos passam a ser verificadas por dependências explícitas em `package.json` e pelo grafo do Nx.
- Workspaces executam binários da raiz via `yarn run -T` (Yarn 4 não expõe binários da raiz aos workspaces).
