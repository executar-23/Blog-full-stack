# Matriz de ambientes e variáveis

Cada app valida suas variáveis com Zod no build/boot (ADR-002). Valores reais nunca
são versionados; use `.env.local` (dev), secrets do GitHub Actions (CI) e
`wrangler secret`/bindings (Cloudflare — G8).

| Variável               | web | studio | event-collector | Obrigatória   | Observação                                            |
| ---------------------- | --- | ------ | --------------- | ------------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | ✓   | —      | —               | web           | URL pública canônica                                  |
| `DATABASE_URL`         | ✓   | ✓      | —               | studio        | Em Workers: connection string do Hyperdrive (ADR-004) |
| `ALLOW_INDEXING`       | ✓   | —      | —               | não (`false`) | `true` só em produção com conteúdo                    |
| `BETTER_AUTH_SECRET`   | —   | ✓      | —               | studio        | ≥ 32 caracteres                                       |
| `BETTER_AUTH_URL`      | —   | ✓      | —               | studio        | URL pública do studio                                 |
| `LOG_LEVEL`            | ✓   | ✓      | —               | não (`info`)  | `debug`/`info`/`warn`/`error`                         |
| `ALLOWED_ORIGINS`      | —   | —      | ✓               | não           | Origens CORS separadas por vírgula                    |

Arquivos de exemplo: `apps/web/.env.example`, `apps/studio/.env.example`,
`apps/event-collector/wrangler.jsonc` (`vars`).

| Ambiente         | Estado                                                                                                                                                                                                                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| local            | PostgreSQL local + `next dev` / `wrangler dev`                                                                                                                                                                                                                                                           |
| CI               | PostgreSQL de serviço no GitHub Actions                                                                                                                                                                                                                                                                  |
| preview/produção | PARCIAL (G8). Conta Cloudflare `Executar-rotina@outlook.com's Account` (`88b77e62…e014`), provisionada 2026-09-28. **`apps/web` em produção e verificado**: `https://blog-full-stack.executar-rotina-8b7.workers.dev` (workers.dev provisório), via Cloudflare Workers Builds (GitHub, branch `claude/sleepy-maxwell-n78pls`). `NEXT_PUBLIC_SITE_URL` fixado em `apps/web/wrangler.jsonc` (`vars`), fonte única de verdade. Domínio próprio, Postgres gerenciado e Hyperdrive: BLOCKED, não provisionados. `apps/studio`/`apps/event-collector`: ainda não conectados nesta conta. |
