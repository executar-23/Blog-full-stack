# CHECKPOINT-01 — Rodada 1 (ADR-006)

| Campo            | Valor                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| ID               | BFS-CHK-01                                                                                                 |
| Data             | 2026-09-27                                                                                                 |
| Branch           | `claude/sleepy-maxwell-n78pls` (13 commits)                                                                |
| Status           | **VERIFIED localmente · push BLOCKED (GitHub 403)**                                                        |
| Critério ADR-006 | **165/165 itens AIKB-0003 representados (100%)** — IMPLEMENTED 29 · SCAFFOLDED 85 · BLOCKED 51 · MISSING 0 |

## 1. Árvore real (raiz)

```text
.github/workflows/ci.yml
apps/        web · studio · event-collector · docs (Storybook)
packages/    design-system · tokens · config · database · content-schema · analytics-schema
             analytics · seo · auth · editorial-components · social-syndication
services/    crm · newsletter · search · recommendations · syndication
content/ editorial/ knowledge/ agents/ workflows/ contracts/ evals/ policies/
examples/ anti-examples/ data/ schemas/ infrastructure/ migrations/
docs/        decisions (ADR-001..006) · architecture · sources · url-governance · taxonomy
             tracking-plan · runbooks · sops · GAPS.md · IDENTITY-MAPPING.md · PLAN.md
tools/       aikb-coverage · static-server
```

Matriz item a item: [`docs/architecture/aikb-0003-coverage.md`](../architecture/aikb-0003-coverage.md).

## 2. Versões instaladas (exatas, `yarn.lock`)

| Ferramenta                 | Versão                             | Ferramenta                          | Versão                                 |
| -------------------------- | ---------------------------------- | ----------------------------------- | -------------------------------------- |
| Node                       | 22.22.2 (`engines >=22.12 <23`)    | Yarn                                | 4.18.1 (`packageManager` + `yarnPath`) |
| Nx                         | 23.2.1                             | TypeScript                          | 6.0.3 (C1)                             |
| Next.js                    | 16.3.6                             | React / React DOM                   | 19.3.0                                 |
| @fluentui/react-components | 9.74.9                             | @fluentui/tokens                    | 1.0.0-alpha.24 (C3)                    |
| @griffel/react             | 1.7.8                              | Storybook (+react-vite, a11y, docs) | 10.6.0                                 |
| Vite                       | 8.3.1                              | ESLint                              | 9.39.5 (C10)                           |
| typescript-eslint          | 8.70.1                             | Prettier                            | 3.9.9                                  |
| Jest                       | 30.5.2                             | @testing-library/react              | 16.3.3                                 |
| jest-axe                   | 11.0.0                             | @playwright/test                    | 1.63.0                                 |
| @axe-core/playwright       | 4.13.0                             | Drizzle ORM / Kit                   | 0.45.3 / 0.31.11                       |
| pg                         | 8.23.0                             | Zod                                 | 4.6.5                                  |
| Better Auth                | 1.7.6                              | @t3-oss/env-nextjs                  | 0.13.11                                |
| @opennextjs/cloudflare     | 1.20.6 (ADR-004)                   | Wrangler                            | 4.141.0                                |
| @cloudflare/workers-types  | 5.20260926.1 (quarentena Yarn 24h) | PostgreSQL (CI)                     | 17                                     |

## 3. Resultados

| Verificação                                | Resultado                                                                                                                                                                                                                         |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn install --immutable`                 | OK; 0 avisos de peer do projeto (upstream: C13)                                                                                                                                                                                   |
| `format:check`                             | OK                                                                                                                                                                                                                                |
| `nx run-many -t lint typecheck test build` | OK — 22 projetos                                                                                                                                                                                                                  |
| Testes unit/integração                     | **316** (config 3, tokens 67, design-system 7, aikb-coverage 211, content-schema 5, analytics-schema 3, analytics 2, seo 6, auth 2 + verificação de tabelas, database 4 e service-search 2 em PostgreSQL real, event-collector 4) |
| Storybook                                  | `build-storybook` OK; smoke Playwright + axe: **14/14**                                                                                                                                                                           |
| Web E2E                                    | **44/44** (18 rotas AIKB + home, desktop + mobile, axe WCAG 2.2 AA, robots, RSS, 404)                                                                                                                                             |
| Studio E2E                                 | RBAC com Better Auth + PostgreSQL: **2/2** (modo sem config: 2/2)                                                                                                                                                                 |
| `drizzle-kit check` / migrate              | OK em PostgreSQL 16 local                                                                                                                                                                                                         |
| Workers                                    | build OpenNext + `wrangler deploy --dry-run`: web 1,31 MB gz · studio 1,75 MB gz · collector 0,12 MB gz; `wrangler dev` local respondeu 200/404 corretos                                                                          |
| CI                                         | workflow criado e simulado localmente; **não executado no GitHub** (push bloqueado)                                                                                                                                               |

## 4. `git diff --stat` (desde o repositório vazio)

`659 files changed, 32068 insertions(+)` — maior parte: README/STATUS por nó do AIKB (330), `yarn.lock`, código de apps/pacotes, fontes preservadas.

## 5. Divergências do plano

1. **Configs da Fase 1 não foram exibidas antes da gravação** (pedido anterior). O ADR-006 exigiu materializar tudo nesta rodada; os conteúdos finais estão versionados (`package.json`, `.yarnrc.yml`, `nx.json`, `tsconfig.base.json`, `eslint.config.mjs`, `packages/config/*`).
2. **ESLint 9.39.5 em vez de 10** (C10) e **remoção de `@nx/eslint-plugin`** (C12) para manter zero conflitos de peer sem supressão.
3. **`@cloudflare/workers-types` 5.20260926.1** em vez de 5.20260927.1: a quarentena de 24h do Yarn 4.18 bloqueou a versão do dia; a regra foi mantida.
4. **`services/*` viraram workspaces** (não estavam em `workspaces` no plano) para tipar as interfaces.
5. **`@blog/tokens`, `@blog/config`, `@blog/database`, `apps/docs`, `tools/*`** existem fora da árvore AIKB (C9, registrado).
6. **Busca/tags como rotas públicas** não foram criadas (não constam no AIKB — G15); a busca existe como `services/search`.
7. **Push/PR não realizados**: GitHub respondeu 403 (Claude sem acesso de escrita ao repositório).

## 6. Pendências de decisão (resumo — completo em `docs/GAPS.md`)

| ID          | Decisão necessária                                                                   |
| ----------- | ------------------------------------------------------------------------------------ |
| IC1b        | Manter `theme-color` #0A63C9 no app (brand kit declara #1F5ECC)?                     |
| IC3         | Neutros do ZIP (#F3F4F6/#E2E4E8) vs brand kit (#F0F0F1/#D5D6D8)                      |
| IC4         | Cor do check de sucesso (#2E7D32 ou variante azul)                                   |
| IC5/C11     | Padrões de apps de terceiros no ZIP e exigência de gateways de IA stubados           |
| IG1         | Famílias tipográficas (hoje: pilhas de sistema)                                      |
| G5          | Wireframes                                                                           |
| G6/G7/G11   | Provedores: e-mail/newsletter/CRM, analytics, sindicação/recomendações               |
| G8          | Conta Cloudflare, Hyperdrive, domínio                                                |
| G9/G10/G12  | Especificação de agentes/workflows/evals/policies; conteúdo editorial; textos legais |
| G13/G14/G15 | `unaccent` na busca; permissões finas por papel; rotas de busca/tags                 |
