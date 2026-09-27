# PLAN — creator-led-platform (repo `blog-full-stack`)

| Campo | Valor |
|---|---|
| ID | BFS-PLAN-0001 |
| VERSION | 0.4.0 |
| WORKFLOW | Rodada 1: materialização integral do target (ADR-006) + fundação técnica |
| OWNER | A DEFINIR |
| Branch | `claude/sleepy-maxwell-n78pls` |

## Hierarquia de fontes

1. [ADR-006](decisions/ADR-006-full-target-materialization.md) — completude nesta rodada
2. [ADR-005](decisions/ADR-005-creator-led-platform-target-architecture.md) — arquitetura alvo
3. [AIKB-0003](sources/AIKB-0003/) — estrutura funcional/editorial/operacional
4. [ZIP de Design System](sources/design-system-zip/) — identidade visual
5. Wireframes (pendentes — G5)
6. ADR-001..004 — implementação técnica

## Fases da rodada (WIP = 1, commit atômico por fase)

| # | Fase | Aceite |
|---|---|---|
| 0 | ADRs, fontes preservadas (SHA-256), target architecture, GAPS | hashes conferem |
| 1 | Workspace: Yarn 4.18.1 (Corepack), Nx, TS strict, ESLint, Prettier, Jest, `packages/config` | `yarn install --immutable` sem avisos de peer |
| 2 | `packages/tokens` a partir do ZIP (fonte + status por token) | build/typecheck/lint/test |
| 3 | `packages/design-system` (BlogProvider + CodeChip) + `apps/docs` Storybook | build, build-storybook, jest-axe, smoke Playwright |
| 4 | Materialização da árvore AIKB (README + STATUS por nó) + `tools/aikb-coverage` | cobertura 100% |
| 5 | Pacotes conhecidos: content-schema, seo, analytics-schema, analytics, auth, editorial-components, social-syndication, database (+ migration) | build/test; migration aplica em PG limpo |
| 6 | `apps/web` (rotas AIKB) + OpenNext/Wrangler | build Next + build OpenNext + dry-run + E2E/axe |
| 7 | `apps/studio` + `apps/event-collector` | build/test |
| 8 | CI GitHub Actions completo | verde no PR |
| — | **CHECKPOINT** | árvore, versões, resultados, Storybook, diff --stat, divergências, matriz AIKB |

## Regras permanentes

- Sem `--force`, `--legacy-peer-deps`, `resolutions`/`packageExtensions` para silenciar peers.
- Nenhum valor visual fora do ZIP (ver `IDENTITY-MAPPING.md`).
- Nenhuma integração externa fictícia; serviços sem provedor ficam `BLOCKED`.
- Nenhum conteúdo editorial inventado.
- Mudança estrutural exige novo ADR (ADR-005, "Regra de mudança").
