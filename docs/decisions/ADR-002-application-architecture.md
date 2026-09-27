# ADR-002 — Arquitetura da aplicação

Status: Accepted (subordinado ao ADR-005/ADR-006)
Data: 2026-09-27

## Contexto

O ADR-005 define a arquitetura alvo `creator-led-platform` e a stack. Este ADR
fixa as decisões técnicas de implementação das aplicações.

## Decisões

| Tema | Decisão |
|---|---|
| Renderização | Next.js 16 App Router; **Server Components por padrão**. Componentes Fluent/Griffel são client e entram como ilhas a partir de `@blog/design-system`. |
| SSR de estilos | `BlogProvider` (client) com `RendererProvider` + `createDOMRenderer`, `SSRProvider` e `useServerInsertedHTML` + `renderToStyleElements` — padrão Fluent/Griffel para App Router. |
| Aplicações | `apps/web` (público), `apps/studio` (editorial/CMS — app próprio conforme ADR-005, substitui a decisão anterior de rota `/studio`), `apps/event-collector` (ingestão de eventos). |
| Dados | PostgreSQL + Drizzle ORM (`packages/database`), migrations versionadas via drizzle-kit. Em Workers: Cloudflare Hyperdrive + driver `pg`. |
| Busca | PostgreSQL full-text search (`tsvector`) — sem serviço externo. |
| Auth/RBAC | Better Auth 1.7.6 (`packages/auth`), adapter Drizzle, papéis `admin`, `editor`, `author`. |
| Env | Validação por Zod no boot; nenhum segredo versionado; `.env.example` por app. |
| Logging/erros | Logger JSON estruturado (`@blog/config/logger`), `error.tsx`, `global-error.tsx`, `not-found.tsx`. |
| Deploy | Cloudflare Workers via OpenNext (ADR-004). Nada de `@vercel/*`. |

## Consequências

- Componentes interativos exigem `'use client'`; páginas e data fetching ficam no servidor.
- `apps/studio` e `apps/web` compartilham `database`, `auth`, `content-schema` e `design-system`.
