# ADR-004 — Deploy em Cloudflare Workers via OpenNext

Status: Accepted (decisão explícita do usuário)
Data: 2026-09-27

## Contexto

O deploy deve ser preparado desde o início para Cloudflare Workers, sem acoplamento à Vercel.

Evidência oficial consultada em 2026-09-27
(developers.cloudflare.com/workers/framework-guides/web-apps/nextjs, "Last updated Aug 25, 2026"):

- A Cloudflare **recomenda vinext** como caminho padrão para novos projetos Next.js em Workers.
- **vinext está em beta** (`vinext@1.0.0-beta.13` no npm).
- O guia OpenNext passou a ser indicado principalmente para aplicações existentes ou quando a migração para vinext não é compatível.

## Decisão

Usar **`@opennextjs/cloudflare@1.20.6`** + **`wrangler@4.141.0`**, **conscientemente**, pela estabilidade:
roda o `next build` real e declara suporte a `next >=16.3.3` (usamos 16.3.6).

## Regras

- Código de aplicação usa apenas APIs Next.js/Web padrão; nenhum pacote `@vercel/*`.
- Bindings Cloudflare (Hyperdrive etc.) isolados num único módulo por app.
- `wrangler.jsonc` com `nodejs_compat`.
- CI executa o build OpenNext e `wrangler deploy --dry-run`; **nenhum deploy real** e nenhuma conta, Worker, Hyperdrive ou domínio criado sem autorização.

## Revisão

**Reavaliar esta decisão quando o vinext atingir estabilidade (1.0.0 estável).**
Critérios: compatibilidade de Fluent UI/Griffel SSR, RSC, route handlers e cache no vinext.

## Alternativas

| Alternativa | Situação                                                   |
| ----------- | ---------------------------------------------------------- |
| vinext      | Recomendado pela Cloudflare, mas beta → descartado por ora |
| Vercel      | Fora do escopo (pedido do usuário: não acoplar à Vercel)   |
