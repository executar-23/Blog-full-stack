# Mapa de rotas públicas — `apps/web`

Fonte: AIKB-0003 (`apps/web/*`). Regra: cada rota do AIKB corresponde a um segmento
do App Router em `apps/web/src/app/<rota>/`. Alterações de URL exigem entrada em
`migrations/redirects/redirects.json` e ADR quando estruturais (ADR-005).

| Rota                     | Diretório                                 | Grupo AIKB                          |
| ------------------------ | ----------------------------------------- | ----------------------------------- |
| `/blog`                  | `apps/web/src/app/blog/`                  | blog                                |
| `/blog/artigos`          | `apps/web/src/app/blog/artigos/`          | blog                                |
| `/blog/topicos`          | `apps/web/src/app/blog/topicos/`          | blog                                |
| `/blog/autores`          | `apps/web/src/app/blog/autores/`          | blog                                |
| `/criadores`             | `apps/web/src/app/criadores/`             | criadores                           |
| `/recursos`              | `apps/web/src/app/recursos/`              | recursos                            |
| `/recursos/calculadoras` | `apps/web/src/app/recursos/calculadoras/` | recursos                            |
| `/recursos/templates`    | `apps/web/src/app/recursos/templates/`    | recursos                            |
| `/recursos/benchmarks`   | `apps/web/src/app/recursos/benchmarks/`   | recursos                            |
| `/newsletter`            | `apps/web/src/app/newsletter/`            | newsletter                          |
| `/planos`                | `apps/web/src/app/planos/`                | planos                              |
| `/sobre`                 | `apps/web/src/app/sobre/`                 | sobre                               |
| `/entrar`                | `apps/web/src/app/entrar/`                | auth                                |
| `/cadastro`              | `apps/web/src/app/cadastro/`              | auth                                |
| `/legal/privacidade`     | `apps/web/src/app/legal/privacidade/`     | legal                               |
| `/legal/cookies`         | `apps/web/src/app/legal/cookies/`         | legal                               |
| `/legal/termos`          | `apps/web/src/app/legal/termos/`          | legal                               |
| `/loja`                  | `apps/web/src/app/loja/`                  | loja (ADR-007, fora da árvore AIKB) |

Rotas técnicas (não listadas no AIKB, exigidas pelo pedido original de SEO):
`/robots.txt`, `/sitemap.xml`, `/rss.xml`.

Rotas de detalhe (`/blog/artigos/[slug]`, `/blog/topicos/[slug]`, `/blog/autores/[slug]`)
dependem de conteúdo publicado e dos wireframes (G5, G10).
