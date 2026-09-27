# creator-led-platform (`blog-full-stack`)

Plataforma editorial, de aquisição, conhecimento e automação — blog **risco-cognitivo**.

| Fonte de verdade                 | Onde                                                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arquitetura alvo                 | [ADR-005](docs/decisions/ADR-005-creator-led-platform-target-architecture.md), [target-architecture.md](docs/architecture/target-architecture.md) |
| Materialização integral + aceite | [ADR-006](docs/decisions/ADR-006-full-target-materialization.md), [aikb-0003-coverage.md](docs/architecture/aikb-0003-coverage.md)                |
| Identidade visual                | [ZIP de Design System](docs/sources/design-system-zip/), [IDENTITY-MAPPING.md](docs/IDENTITY-MAPPING.md)                                          |
| Decisões técnicas                | [ADR-001..004](docs/decisions/)                                                                                                                   |
| GAPs e conflitos                 | [GAPS.md](docs/GAPS.md)                                                                                                                           |

## Stack

Node 22 · Yarn 4.18.1 (Corepack) · Nx 23 · TypeScript 6 strict · Next.js 16 (App Router) ·
React 19 · Fluent UI v9 + Griffel · Storybook 10 · PostgreSQL + Drizzle · Better Auth ·
Jest + RTL + jest-axe · Playwright + axe · Cloudflare Workers via OpenNext · GitHub Actions.

## Comandos

```bash
corepack enable
yarn install --immutable
yarn nx run-many -t lint typecheck test build   # DATABASE_URL habilita testes de integração
yarn storybook                                   # catálogo da identidade (apps/docs)
yarn workspace @blog/web dev                     # http://localhost:3000
yarn workspace @blog/database run db:migrate     # requer DATABASE_URL
yarn workspace @blog/aikb-coverage run report    # matriz AIKB-0003 (falha se < 100%)
```

Variáveis por app: [environment-matrix.md](infrastructure/environments/environment-matrix.md).
