# Target Architecture — creator-led-platform

Fonte: [AIKB-0003](../sources/AIKB-0003/AIKB-0003__conceito-blog-full-stack.txt) (reproduzida integralmente, sem omissões).
Autoridade: [ADR-005](../decisions/ADR-005-creator-led-platform-target-architecture.md) (target state) e
[ADR-006](../decisions/ADR-006-full-target-materialization.md) (materialização integral nesta rodada).

Cobertura real por item: [aikb-0003-coverage.md](./aikb-0003-coverage.md) (gerada por `yarn nx run aikb-coverage:report`).

## Árvore alvo

```text
creator-led-platform/
├── apps/
│   ├── web/
│   │   ├── blog/
│   │   │   ├── artigos/
│   │   │   ├── topicos/
│   │   │   └── autores/
│   │   ├── criadores/
│   │   ├── recursos/
│   │   │   ├── calculadoras/
│   │   │   ├── templates/
│   │   │   └── benchmarks/
│   │   ├── newsletter/
│   │   ├── planos/
│   │   ├── sobre/
│   │   ├── entrar/
│   │   ├── cadastro/
│   │   └── legal/
│   │       ├── privacidade/
│   │       ├── cookies/
│   │       └── termos/
│   ├── studio/
│   └── event-collector/
│
├── packages/
│   ├── design-system/
│   ├── editorial-components/
│   ├── content-schema/
│   ├── analytics-schema/
│   ├── analytics/
│   ├── seo/
│   ├── auth/
│   └── social-syndication/
│
├── content/
│   ├── articles/
│   ├── authors/
│   ├── topics/
│   ├── series/
│   ├── campaigns/
│   ├── resources/
│   └── landing-pages/
│
├── editorial/
│   ├── pilares/
│   │   ├── p1-riscos-cognitivos/
│   │   ├── p2-processos-neuroadaptativos/
│   │   └── p3-ferramentas-solucoes/
│   ├── consciencia/
│   │   ├── c1-descoberta/
│   │   ├── c2-compreensao/
│   │   └── c3-decisao/
│   ├── topic-packs/
│   ├── briefs/
│   ├── research/
│   ├── outlines/
│   ├── drafts/
│   ├── fact-check/
│   ├── reviews/
│   ├── published/
│   └── distribution/
│
├── knowledge/
│   ├── audience/
│   ├── research/
│   ├── psychology/
│   ├── linguistics/
│   ├── editorial/
│   ├── didactics/
│   ├── storytelling/
│   ├── commercial/
│   ├── marketing/
│   ├── ux/
│   ├── design-system/
│   ├── analytics/
│   ├── products/
│   ├── brand/
│   ├── policies/
│   └── evidence/
│
├── agents/
│   ├── a01-research-intelligence/
│   ├── a02-strategy/
│   ├── a03-communication/
│   ├── a04-story/
│   ├── a05-experience/
│   ├── a06-visual/
│   ├── a07-growth/
│   ├── a08-governance/
│   └── manager-orchestrator/
│
├── workflows/
│   ├── research/
│   ├── strategy/
│   ├── communication/
│   ├── story/
│   ├── experience/
│   ├── visual/
│   ├── growth/
│   ├── governance/
│   ├── editorial-production/
│   ├── acquisition/
│   ├── conversion/
│   ├── retention/
│   └── learning-loop/
│
├── contracts/
│   ├── input/
│   ├── output/
│   ├── handoff/
│   ├── state/
│   └── acceptance/
│
├── evals/
│   ├── editorial/
│   ├── linguistic/
│   ├── ux/
│   ├── storytelling/
│   ├── commercial/
│   ├── design/
│   ├── accessibility/
│   ├── seo/
│   └── analytics/
│
├── policies/
│   ├── linguistic-policy/
│   ├── terminology/
│   ├── voice-rules/
│   ├── accessibility/
│   ├── brand/
│   ├── editorial/
│   ├── privacy/
│   └── security/
│
├── examples/
├── anti-examples/
│
├── services/
│   ├── crm/
│   ├── newsletter/
│   ├── search/
│   ├── recommendations/
│   └── syndication/
│
├── data/
│   ├── events/
│   ├── leads/
│   ├── content-performance/
│   ├── audience/
│   ├── state/
│   └── evidence/
│
├── schemas/
│   ├── content/
│   ├── tasks/
│   ├── agents/
│   ├── workflows/
│   ├── state/
│   ├── evidence/
│   ├── evals/
│   └── analytics/
│
├── infrastructure/
│   ├── environments/
│   ├── cdn/
│   ├── dns/
│   ├── observability/
│   ├── ci-cd/
│   └── security/
│
├── migrations/
│   ├── content/
│   └── redirects/
│
└── docs/
    ├── architecture/
    ├── url-governance/
    ├── taxonomy/
    ├── tracking-plan/
    ├── runbooks/
    ├── sops/
    └── decisions/
```

## Bootstrap técnico adicional (fora da árvore AIKB-0003 — conflito C9)

Estes projetos existem porque a stack técnica do ADR-005 os exige; não substituem
nenhum item da árvore alvo.

| Caminho               | Motivo                                                          | Relação com o target                  |
| --------------------- | --------------------------------------------------------------- | ------------------------------------- |
| `packages/tokens`     | Citado no ADR-005 (seção Identidade visual)                     | alimenta `packages/design-system`     |
| `packages/config`     | Presets compartilhados (TS/ESLint/Jest) exigidos pelo workspace | infraestrutura de build               |
| `packages/database`   | ORM Drizzle (stack ADR-005)                                     | implementa `schemas/` + `migrations/` |
| `apps/docs`           | Storybook (stack ADR-005)                                       | catálogo de `packages/design-system`  |
| `tools/aikb-coverage` | Matriz de aceite exigida pelo ADR-006                           | governança                            |

## Extensão pós-ADR-006 (fora da árvore AIKB-0003 — ADR-007)

| Caminho                 | Motivo                                                                                    | Relação com o target                            |
| ----------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `apps/web/src/app/loja` | Pedido do usuário 2026-09-28, com protótipo próprio ("Executar Store S01") como wireframe | conecta com `blog/artigos`; catálogo real = G17 |
