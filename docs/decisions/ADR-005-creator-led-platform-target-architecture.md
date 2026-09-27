# ADR-005 — Arquitetura Alvo da Creator-Led Platform

Status: ACCEPTED
Data: 2026-09-27
Owner: A DEFINIR
Escopo: blog-full-stack / creator-led-platform

> Registrado verbatim conforme fornecido pelo usuário em 2026-09-27.
> A estratégia incremental ("Não criar toda a árvore vazia antecipadamente")
> foi posteriormente substituída pelo ADR-006.

## Contexto

O projeto deixa de ser tratado apenas como um blog e passa a ser uma
plataforma editorial, aquisição, conhecimento e automação.

O AIKB-0003 define uma arquitetura que inclui aplicação web, conteúdo,
design system, schemas, analytics, autenticação, workflows, agentes,
policies, evals, serviços, dados e infraestrutura. Aikb-0003.txt

O produto deve ser full stack operacional: frontend, backend, banco,
CMS/editorial, infraestrutura, SEO, analytics, segurança, integrações e
pipeline de desenvolvimento. AIKB-0003__conceito-blog-full-stack.txt

## Decisão

Adotar `creator-led-platform` como ARQUITETURA ALVO.

A arquitetura mínima anterior passa a ser somente o bootstrap técnico.

Fonte de verdade, em ordem:

1. Este ADR — arquitetura e boundaries.
2. AIKB-0003 — estrutura funcional, editorial e operacional.
3. ZIP de Design System — fonte canônica da identidade visual.
4. Wireframes futuros — composição de páginas, nunca redefinição dos tokens.
5. ADRs técnicos específicos — implementação.

## Estrutura alvo

- `apps/web` — blog, criadores, recursos, newsletter, planos, auth e legal.
- `apps/studio` — operação editorial/CMS.
- `apps/event-collector` — eventos e telemetria.
- `packages/design-system` — componentes compartilhados.
- `packages/editorial-components` — componentes editoriais.
- `packages/content-schema`, `analytics-schema`, `seo`, `auth`,
  `analytics`, `social-syndication`.
- `content/` — conteúdo publicável.
- `editorial/` — pilares, briefs, research, drafts, reviews e distribuição.
- `knowledge/` — base de conhecimento por domínio.
- `agents/` + `workflows/` — automação e orquestração.
- `contracts/`, `schemas/`, `evals/`, `policies/` — governança.
- `services/`, `data/`, `infrastructure/`, `migrations/`, `docs/`.

Essa estrutura está explicitamente definida no AIKB-0003. Aikb-0003.txt

A árvore integral está em [`docs/architecture/target-architecture.md`](../architecture/target-architecture.md).

## Identidade visual

O ZIP fornecido é a identidade oficial.

Extrair dele:
cores, typography, fonts, spacing, radius, borders, shadows, grids,
responsividade, motion, estados, accessibility e componentes.

`packages/tokens` normaliza esses valores.
`packages/design-system` implementa-os sobre Fluent UI v9 + Griffel.

Fluent é infraestrutura, NÃO identidade visual.
Não criar placeholders nem substituir valores do ZIP por defaults Fluent.

## Stack técnica

Node 22 + Yarn 4 + Nx + TypeScript strict.
Next.js App Router + React.
Fluent UI v9 + Griffel.
Storybook.
PostgreSQL + Drizzle.
Better Auth.
Playwright/Jest/RTL/axe.
Cloudflare Workers via OpenNext.
GitHub Actions.

## Estratégia de implementação

Não criar toda a árvore vazia antecipadamente.

Evoluir nesta ordem:

`workspace → tokens → design-system → Storybook → web shell → content/schema
→ database → studio → wireframes → analytics/services → agents/workflows
→ infrastructure/produção`

Cada diretório só nasce quando possuir responsabilidade e implementação reais.

## Regra de mudança

Nenhum agente pode alterar esta arquitetura silenciosamente.

Mudança estrutural relevante exige:

- novo ADR;
- motivo;
- impacto;
- alternativas;
- migração;
- aprovação.

Este ADR torna a arquitetura acima o TARGET STATE oficial do repositório.
