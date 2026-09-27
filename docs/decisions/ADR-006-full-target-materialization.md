# ADR-006 — Implementação Integral da Arquitetura Alvo Nesta Rodada

**Status:** ACCEPTED
**Data:** 2026-09-27
**Escopo:** `creator-led-platform`
**Autoridade:** substitui qualquer plano anterior que proponha adiar partes da árvore alvo.

> Registrado verbatim conforme fornecido pelo usuário em 2026-09-27.

## Contexto

O AIKB-0003 define uma arquitetura completa para a plataforma, incluindo aplicações, packages, conteúdo, operação editorial, knowledge base, agentes, workflows, contratos, evals, policies, services, data, schemas, infraestrutura, migrations e documentação. Aikb-0003.txt

A plataforma também deve ser entendida como produto full stack operacional, envolvendo frontend, backend, banco, CMS, infraestrutura, SEO, analytics, segurança e integrações. AIKB-0003__conceito-blog-full-stack.txt

## Decisão

**Nada da arquitetura definida no AIKB-0003 poderá ficar para uma rodada futura.**

Nesta rodada, o agente DEVE materializar integralmente a Target Architecture:

- `apps/`
- `packages/`
- `content/`
- `editorial/`
- `knowledge/`
- `agents/`
- `workflows/`
- `contracts/`
- `evals/`
- `policies/`
- `examples/`
- `anti-examples/`
- `services/`
- `data/`
- `schemas/`
- `infrastructure/`
- `migrations/`
- `docs/`

Incluindo **todas as subpastas exatamente descritas no AIKB-0003**. Aikb-0003.txt

## Regra de completude

Não é permitido:

- remover áreas por considerar prematuras;
- substituir a árvore por uma versão "MVP";
- deixar componentes arquiteturais fora do repositório;
- mover itens para "future work";
- reduzir a estrutura por conveniência técnica;
- reinterpretar `apps/studio`, `event-collector`, agents, workflows, services ou demais domínios como opcionais.

## Profundidade mínima nesta rodada

Quando ainda não houver especificação funcional suficiente para implementação completa, a área deve mesmo assim existir com:

1. diretório correto;
2. `README.md` descrevendo responsabilidade;
3. contratos/interfaces conhecidos;
4. configuração mínima quando aplicável;
5. `STATUS.md` indicando `IMPLEMENTED`, `SCAFFOLDED` ou `BLOCKED`;
6. GAP explícito para qualquer requisito ainda ausente.

**Diretório vazio não conta como implementação.**

## Design System

O ZIP fornecido permanece a fonte canônica de identidade visual.

Nenhuma cor, fonte, spacing, motion, radius ou regra visual deve ser inventada ou substituída por defaults do Fluent.

## Critério de aceite

Antes do checkpoint, o agente deve produzir uma matriz:

`ITEM AIKB-0003 → CAMINHO REAL → STATUS → EVIDÊNCIA`

O checkpoint só é aprovado quando **100% dos itens da árvore alvo estiverem representados no repositório**.

Qualquer ausência deve ser tratada como falha da rodada, não como backlog.

## Nota de implementação (agente, 2026-09-27)

- A matriz é gerada por `tools/aikb-coverage/` a partir do arquivo preservado em
  `docs/sources/AIKB-0003/` e publicada em `docs/architecture/aikb-0003-coverage.md`.
- Rotas de `apps/web/*` do AIKB-0003 são materializadas como rotas Next.js em
  `apps/web/src/app/<mesmo caminho>/`; a matriz registra o caminho real.
- Esta rodada não cria integrações fictícias: serviços sem provedor definido
  ficam `BLOCKED` com interface e GAP explícitos.
