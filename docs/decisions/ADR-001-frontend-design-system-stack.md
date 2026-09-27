# ADR-001 — Stack do Design System

Status: Accepted
Data: 2026-09-27

> Seções "Contexto" a "Implementação" registradas conforme texto do usuário.
> Seções "Por que esta stack", "Alternativas descartadas", "Consequências
> detalhadas" e "Adendo — identidade visual" foram adicionadas a pedido do usuário
> (ajuste 9 e correção obrigatória de identidade visual).

## Contexto

O design-system deve seguir o mais próximo possível a arquitetura pública moderna
do Microsoft Fluent UI / Microsoft 365, evitando decisões provisórias ou uma
stack paralela desnecessária.

Não existe package.json anterior que precise ser preservado.

## Decisão

O monorepo deverá usar:

Runtime:

- Node.js 22.x

Workspace / package manager:

- Yarn 4.x
- Corepack habilitado
- versão exata do Yarn fixada em `packageManager`
- Nx como sistema de monorepo/build orchestration

Frontend:

- React
- TypeScript em strict mode
- Fluent UI React v9 (`@fluentui/react-components`)

Design System:

- `@fluentui/tokens`
- FluentProvider e temas Fluent
- Griffel (`@griffel/react`) para styling
- CSS custom properties geradas/consumidas pelos tokens
- evitar valores visuais hardcoded quando existir token equivalente

Documentação:

- Storybook
- stories junto aos componentes ou em projeto dedicado de docs

Qualidade:

- ESLint
- Prettier
- Jest
- React Testing Library
- testes de acessibilidade
- Cypress para integração/E2E quando necessário (substituído por Playwright — ver ADR-003)

## Estrutura alvo

```
/
├── apps/
│   └── docs/                 # Storybook / documentação
├── packages/
│   ├── design-system/        # componentes próprios
│   ├── tokens/               # tokens adicionais do produto
│   └── config/               # configurações compartilhadas
├── nx.json
├── package.json
├── tsconfig.base.json
├── yarn.lock
└── .yarnrc.yml
```

## Regras arquiteturais

1. Fluent UI v9 é a base dos componentes.
2. Não recriar primitivas que já existem no Fluent UI sem justificativa.
3. Componentes próprios devem compor/extender Fluent UI.
4. Usar tokens para cor, spacing, typography, radius etc.
5. Usar Griffel para estilos de componentes.
6. TypeScript strict é obrigatório.
7. Não usar pnpm ou npm para gerenciamento do workspace.
8. Não introduzir Tailwind, Emotion ou styled-components como segunda
   solução de styling.
9. Não adicionar backend/Hono ao design-system sem necessidade explícita.
10. Dependências e versões devem ser centralizadas no workspace.

## Consequências

Esta decisão privilegia compatibilidade conceitual e técnica com o ecossistema
Fluent UI moderno e reduz divergências entre o design system e interfaces
Microsoft 365/Copilot.

## Por que esta stack

| Escolha            | Motivo                                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Yarn 4 + Corepack  | Mesmo gerenciador do repositório público `microsoft/fluentui`; versão exata fixada em `packageManager` + `yarnPath` torna o lockfile reproduzível sem depender do Yarn global. |
| Nx                 | Orquestração com cache e grafo de projetos (`nx affected`) — também usado pelo repositório Fluent; escala para a árvore completa do ADR-005.                                   |
| Fluent UI v9       | Biblioteca de componentes acessíveis (WCAG) mantida pela Microsoft, tematizável por tokens; evita recriar primitivas (Button, Dialog, Popover, Menu…).                         |
| Griffel            | Motor CSS-in-JS atômico do próprio Fluent v9, com suporte a SSR e extração AOT — uma única solução de styling para DS e apps.                                                  |
| `@fluentui/tokens` | Contrato de tokens do Fluent; nossos tokens de identidade são mapeados para ele (ver adendo).                                                                                  |

## Alternativas descartadas

| Alternativa                                           | Motivo do descarte                                                    |
| ----------------------------------------------------- | --------------------------------------------------------------------- |
| pnpm / npm workspaces                                 | Regra 7; diverge da referência Fluent.                                |
| Turborepo                                             | Nx já cobre cache/grafo e tem plugins para Storybook/Next/Playwright. |
| Tailwind, Emotion, styled-components, vanilla-extract | Segunda solução de styling (regra 8); Griffel é nativo do Fluent.     |
| MUI, Radix, shadcn/ui, Chakra                         | Paralelos ao Fluent; duplicariam primitivas.                          |
| Fluent UI v8 (`@fluentui/react`)                      | Legado; v9 é a linha atual.                                           |

## Consequências detalhadas

- Componentes Fluent/Griffel são **client components**; em Next.js App Router
  ficam como ilhas `'use client'` e o restante permanece Server Component (ADR-002).
- `@fluentui/tokens` só é publicado como `1.0.0-alpha.24`; fixamos exatamente a
  mesma versão usada internamente por `@fluentui/react-theme` (conflito C3).
- Alinhamento conceitual com Fluent implica atualizações coordenadas das versões
  `@fluentui/*`.

## Adendo — identidade visual (correção obrigatória do usuário, 2026-09-27)

1. A identidade visual oficial é a do ZIP de Design System preservado em
   [`docs/sources/design-system-zip/`](../sources/design-system-zip/)
   (`handoff-spec-onboarding-patterns.md` e `design-system-producao.md`).
2. Fluent UI v9 é infraestrutura técnica; **não** substitui nem modifica a identidade.
3. Token do ZIP com equivalente Fluent → mapeado ao token Fluent semanticamente adequado.
4. Sem equivalente Fluent → token próprio em `@blog/tokens`, preservando a intenção.
5. Valores do ZIP nunca são trocados por defaults Fluent por conveniência.
6. Conflitos internos às fontes são registrados como CONFLICT (docs/GAPS.md) e
   nunca escolhidos silenciosamente.
7. Fonte especificada sem arquivo/licença → especificação preservada + GAP.
8. Storybook é o catálogo oficial da identidade.
9. Wireframes consomem o design system; não o redefinem.

Decisões do usuário sobre conflitos de identidade (2026-09-27): cor primária
`#0A63C9` (faixa do handoff prevalece sobre `#1F5ECC` do brand kit); faixas
tipográficas/motion viram valores responsivos; ramp de 16 tons derivado do azul
primário. Detalhes em [`docs/IDENTITY-MAPPING.md`](../IDENTITY-MAPPING.md).
