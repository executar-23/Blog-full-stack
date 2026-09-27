# @blog/design-system

Componentes compartilhados sobre Fluent UI v9 + Griffel, com identidade de `@blog/tokens` (ADR-001).

| Export                                         | Descrição                                                                                                | Status      |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------- |
| `BlogProvider`                                 | `FluentProvider` com `blogLightTheme`, `SSRProvider`, `RendererProvider` opcional e variáveis `--blog-*` | IMPLEMENTED |
| `createBlogRenderer` / `renderToStyleElements` | Renderer Griffel para SSR (Next.js App Router: `useServerInsertedHTML`)                                  | IMPLEMENTED |
| `CodeChip`                                     | Componente de referência (handoff: `CodeChip`)                                                           | IMPLEMENTED |

Regras: nenhum literal visual (cor/px/ms) fora de `@blog/tokens` — verificado pelo ESLint.
Os demais componentes serão derivados dos wireframes (G5).
