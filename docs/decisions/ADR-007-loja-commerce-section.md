# ADR-007 — Seção "Loja" (`/loja`), fora da árvore AIKB-0003

| Campo  | Valor                                |
| ------ | ------------------------------------ |
| Status | Accepted                             |
| Data   | 2026-09-28                           |
| Autor  | Usuário (BLOG-FULLSTACK)             |
| Afeta  | `apps/web`, `packages/design-system` |

## Contexto

O usuário forneceu um protótipo estrutural e interativo próprio (`index.html` /
`store-home.html` + `README.md`, "Executar Store — Protótipo S01"), pedindo a
implementação de uma seção de loja em `apps/web`. Nenhuma das duas árvores de
verdade do projeto (AIKB-0003 nem a stack do ADR-005) prevê uma seção de
comércio — isso não é uma omissão a corrigir silenciosamente, é uma extensão
de escopo pedida agora, registrada aqui como o próprio ADR-005 manda para
mudanças estruturais de rota.

Quando perguntado o caminho da rota e a relação com o restante do site, o
usuário respondeu: **"Essa é uma rota que se conecta com os artigos e a loja
de ferramentas e-books, soluções etc."** — ou seja, a Loja é um catálogo
(ferramentas, e-books, soluções) que se relaciona com o conteúdo editorial do
blog, não uma feature isolada.

## Decisão

1. **Nova rota pública `/loja`** em `apps/web` (português, consistente com
   `/blog`, `/criadores`, `/recursos`, `/planos`, `/sobre`). Registrada em
   `docs/url-governance/routes.md` e `apps/web/src/site.ts` como extensão
   pós-ADR-006, do mesmo jeito que `packages/tokens`/`packages/config` etc.
   são bootstrap técnico fora da árvore AIKB (C9).
2. **O protótipo do usuário é a especificação estrutural** (wireframe): seções
   (hero de destaque, grade editorial, lista "selecionados", prateleira de
   coleções, destaque editorial grande, grade filtrável por categoria, busca
   local) e comportamento (troca de view por aba, filtro por categoria,
   busca client-side, estados vazio) são implementados fielmente.
3. **O "design system interno" do protótipo NÃO é identidade canônica.** O
   próprio arquivo se rotula: `PROVENIENCIA=AMOSTRADA — baseline visual
inferido... não é token oficial exportado. Valores cromáticos são
provisórios.` Confirmado explicitamente pelo usuário nesta rodada: _"o
   design system interno não considere como wireframes, não misture as
   coisas."_ Nenhuma cor/hsl/px do protótipo é copiada. Toda a estilização
   usa `@blog/tokens` (`blogTokens`) e, onde a identidade é silente (ex.:
   superfície escura invertida do hero — não há token `dark surface` no ZIP),
   os tokens semânticos do próprio Fluent (`colorNeutralBackgroundInverted`,
   `colorNeutralForegroundInverted`), pelo mesmo padrão já usado em IG2.
4. **Conexão com artigos**: CTAs editoriais apontam para `/blog/artigos`
   (rota real já existente) — nunca para um slug de artigo inventado, já que
   não existe conteúdo editorial publicado (G10).
5. **Catálogo real de produtos, preços, checkout e provedor de pagamento**:
   GAP (G17). Esta rodada entrega a estrutura com catálogo de exemplo
   claramente rotulado como tal (mesmo padrão do protótipo do usuário:
   "Produto de exemplo A", "Coleção de exemplo 01"), sem inventar produtos,
   preços ou um provedor de e-commerce.
6. **Componentes novos em `packages/design-system`** (não só na página):
   `CardLink`, `Hero`, `EditorialCard`, `CollectionTile`, `ProductCard`,
   `ProductListRow`, `FilterChipGroup`, `SectionTabs`, `EmptyState`. Ficam no
   design system (não embutidos só em `apps/web`) porque são genéricos o
   bastante para reuso em outras áreas do site (ex.: `EditorialCard` serve
   para cards de artigo do blog quando esse conteúdo existir) — mesma regra
   do ADR-001 de identidade nascer em `packages/design-system`.

## Consequências

- `docs/architecture/aikb-0003-coverage.md` permanece 165/165: `/loja` é uma
  adição além da árvore, não um item da árvore, e o script de cobertura não
  precisa (nem deve) ser alterado para "inventar" `/loja` como se estivesse
  no AIKB-0003.
- G17 fica aberto até o usuário definir catálogo real, preços e provedor de
  pagamento/checkout.
- IC1b/IC3/IC4/IG1–IG8 (identidade) não são afetados; os novos componentes
  seguem exatamente os mesmos tokens já resolvidos/registrados.
