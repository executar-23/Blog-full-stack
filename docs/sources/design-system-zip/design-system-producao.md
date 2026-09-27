---
description: Produz o Design System full-stack do repositório (tokens, componentes, contratos e serviços) a partir do handoff extraído das telas de referência, usando a skill /design:design-system.
argument-hint: "[audit|document|extend] [caminho-do-repo]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# /design-system-producao

Comando operacional para o Claude Code. Transforma o handoff `handoff-spec-onboarding-patterns.md` em uma **produção full-stack** do design system — não apenas tokens e componentes visuais, mas também os contratos e serviços de backend que os componentes com IA (Copilot-like) e dados dinâmicos (calendário, e-mail, RSVP) exigem para funcionar de ponta a ponta.

Este comando invoca a skill `/design:design-system` (modo `$1`, default `extend`) como motor de auditoria/documentação/extensão, mas governa a estrutura de pastas, os artefatos gerados e os critérios de aceitação.

---

## OBJECTIVE

Produzir, na raiz do repositório informado em `$2` (default: raiz atual), uma estrutura de design system full-stack — tokens, biblioteca de componentes, contratos compartilhados (tipos/schemas) e os serviços de backend que os componentes dependentes de dados/IA consomem — com documentação gerada pela skill `/design:design-system` para cada componente do handoff, e sem placeholders pendentes.

## CONTEXT

<context>
- O handoff de origem já foi produzido e cobre dois lotes de telas de referência: (1) padrões de onboarding/coachmark, calendário mensal, popover de menu, troca de contas, cliente de e-mail com painel de IA lateral, e-mail de OTP; (2) sugestão de resposta por IA, coaching de tom inline, week/day view de calendário com popover de detalhe de evento e RSVP, modal de novo evento mobile, sidebar de contas/pastas, dropdown de troca de visualização, mais um passo de coachmark, dois design systems de marketing site (Guardbase, Dataguard) e um cartão de produto de e-commerce.
- Vários componentes documentados **não são puramente visuais**: `AIPanel.ReplySuggestion`, `InlineEditor.CoachingPopover`, `EventDetailPopover` (com RSVP/mutação), `Modal.NewEvent` (com persistência) e `PromoCard.HappeningNow` dependem de um backend (LLM gateway, API de calendário/e-mail, autenticação). Por isso a produção é full-stack: sem os contratos e serviços correspondentes, o design system fica incompleto — apenas "casca" visual.
- Ambiente de execução: Claude Code, com acesso de leitura/escrita ao repositório local.
</context>

## INPUT

<input>
- Handoff de referência: `docs/handoff/handoff-spec-onboarding-patterns.md` (copiar o arquivo gerado nesta conversa para esse caminho antes de rodar o comando, caso ainda não exista no repo).
- Argumento `$1`: modo da skill `/design:design-system` — `audit` | `document` | `extend`. Default: `extend` (o handoff já é a especificação de componentes novos a incorporar).
- Argumento `$2`: caminho do repositório-alvo. Default: diretório atual.
- Stack declarada pelo usuário, se houver (framework de UI, linguagem de backend, monorepo tool). Se não houver, inferir do `package.json`/`pyproject.toml`/`go.mod` existente antes de propor stack nova.
</input>

## CONSTRAINTS

- Obrigatório: cada componente do handoff marcado como dependente de dados/IA deve gerar (a) o componente de UI, (b) o contrato de tipos/schema, e (c) o stub ou integração real do serviço de backend correspondente — não apenas o componente visual.
- Obrigatório: tokens devem ser centralizados em um único pacote/fonte de verdade (`packages/tokens`) e referenciados por nome, nunca reintroduzidos como valores soltos nos componentes.
- Obrigatório: usar a skill `/design:design-system` para o audit/document/extend de cada componente — não reescrever esse contrato manualmente por fora da skill.
- Proibição: não inventar endpoints, chaves de API ou dados de autenticação reais — usar contratos/tipos e stubs mockados quando o backend real não existir no repo.
- Proibição: não remover ou sobrescrever componentes/tokens existentes no repo sem reportar o conflito antes de decidir.
- Limite: não criar abstrações de uso único; reaproveitar padrões já existentes no repo quando equivalentes a um componente do handoff.
- Se o repositório já tiver um design system parcial, tratar como `audit` primeiro (mesmo que `$1` seja outro) antes de estender, para não duplicar.

## TOOLS

- `Glob`/`Grep` → usar para mapear estrutura atual do repo (monorepo? framework? já existe `packages/tokens` ou equivalente?) antes de propor a árvore full-stack; verificar se algo já cobre o escopo.
- `Read` → ler `docs/handoff/handoff-spec-onboarding-patterns.md` e qualquer design system/token file existente antes de gerar novo conteúdo.
- skill `/design:design-system` (`$1`) → motor de audit/document/extend por componente; verificar que a saída de cada chamada segue o template da própria skill (Variants/States/Props/A11y ou Audit table).
- `Write`/`Edit` → criar/editar arquivos apenas dentro da árvore definida em OUTPUT CONTRACT; verificar que nenhum arquivo é sobrescrito sem necessidade.
- `Bash` → apenas para scaffolding de pastas/monorepo tooling (ex.: `mkdir -p`, inicialização de workspace) quando não houver ferramenta mais específica; verificar exit code antes de prosseguir.

## EXECUTION

1. Ler `docs/handoff/handoff-spec-onboarding-patterns.md`; se ausente, avisar e parar (não inventar o conteúdo do handoff).
2. Mapear o repositório: stack de frontend, stack de backend, monorepo tool (Turborepo/Nx/pnpm workspaces/outro), e qualquer design system pré-existente.
3. Classificar cada componente do handoff em duas trilhas:
   - **Trilha visual-pura** (tokens, layout, componentes sem dependência de dados dinâmicos — ex. `Calendar.MonthGrid`, `StepList.Numbered`, `MarketingSite.Hero`).
   - **Trilha full-stack** (componentes com IA/dados/mutação — ex. `AIPanel.ReplySuggestion`, `InlineEditor.CoachingPopover`, `EventDetailPopover`, `Modal.NewEvent`, `PromoCard.HappeningNow`).
4. Para a trilha visual-pura: gerar/atualizar tokens em `packages/tokens` e o componente em `packages/ui-web` (ou pacote equivalente já existente), documentando cada um via skill `/design:design-system document [componente]`.
5. Para a trilha full-stack, por componente:
   a. Definir o contrato compartilhado (tipo/schema) em `packages/contracts`.
   b. Criar ou apontar para o serviço de backend correspondente em `services/` (stub com a forma da resposta, se o serviço real não existir).
   c. Gerar o componente de UI em `packages/ui-web` consumindo o contrato — nunca com o shape da API implícito/hardcoded no componente.
   d. Documentar via skill `/design:design-system extend [componente]`, incluindo a seção de contrato/serviço como extensão do template padrão.
6. Rodar `/design:design-system audit` ao final sobre o conjunto gerado, para checar nomenclatura e cobertura de tokens antes de finalizar.
7. Gerar/atualizar `README.md` na raiz do design system explicando a estrutura full-stack e como rodar `docs` (Storybook/equivalente) localmente.
8. Reportar ao usuário: o que foi criado, o que foi apenas stubado (precisa de backend real depois), e qualquer conflito encontrado no passo 2 que não foi resolvido automaticamente.

## OUTPUT CONTRACT

Estrutura mínima na raiz do design system (adaptar nomes de pacote ao stack real do repo, mantendo os papéis abaixo):

```
design-system/
├── packages/
│   ├── tokens/                 # fonte única de verdade dos tokens (cores, tipografia, espaçamento, motion)
│   ├── contracts/              # tipos/schemas compartilhados (ex.: OpenAPI/GraphQL/TS types) consumidos por UI e serviços
│   ├── ui-web/                 # componentes visuais (web) — inclui trilha visual-pura e trilha full-stack
│   └── icons/                  # (se aplicável)
├── services/
│   ├── ai-panel-gateway/       # backend por trás de AIPanel.ReplySuggestion e InlineEditor.CoachingPopover
│   └── calendar-mail-api/      # backend por trás de EventDetailPopover, Modal.NewEvent e ações de RSVP/e-mail
├── apps/
│   └── docs/                   # site de documentação (Storybook ou equivalente já usado no repo)
├── docs/
│   └── handoff/
│       └── handoff-spec-onboarding-patterns.md
└── README.md
```

Cada componente da trilha full-stack deve ter, no mínimo:
- 1 arquivo de contrato em `packages/contracts`
- 1 componente em `packages/ui-web` que importa esse contrato (não redefine o shape)
- 1 serviço (real ou stub) em `services/`
- 1 entrada de documentação gerada pela skill `/design:design-system`

## VALIDATION

- [ ] Todo componente da trilha full-stack tem contrato + serviço + componente + documentação (nenhum dos quatro faltando).
- [ ] Nenhum valor de cor/tipografia/espaçamento hardcoded fora de `packages/tokens` nos componentes gerados.
- [ ] A saída de `/design:design-system audit` não reporta nomenclatura inconsistente entre os componentes novos.
- [ ] `README.md` explica a divisão full-stack (por que existe `services/` num "design system").
- [ ] Nenhum arquivo pré-existente do repo foi sobrescrito sem ter sido reportado como conflito no passo 2.

## STOP CONDITIONS

Finalizar quando a árvore do OUTPUT CONTRACT estiver populada para todos os componentes do handoff, a validação acima passar, e o relatório do passo 8 tiver sido entregue ao usuário. Não continuar refinando componentes além do que o handoff especifica.
