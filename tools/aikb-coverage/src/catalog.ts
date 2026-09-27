import type { AikbNode, Status } from './aikb';

/**
 * Initial README/STATUS content for each AIKB-0003 node (ADR-006, "profundidade
 * mínima"). Responsibilities are derived only from the node name, its position
 * in AIKB-0003 and the documents cited; missing specifications are GAPs
 * (docs/GAPS.md). Nodes implemented in code get their STATUS updated by the
 * phase that implements them.
 */
export interface NodeSpec {
  responsibility: string;
  status: Status;
  gaps: string[];
  evidence: string;
  /** Extra files created next to README/STATUS when missing. */
  files?: Record<string, string>;
}

const FOUNDATION = 'Notion "02 — Foundation Doc" (GTM-Blog)';

const pillars: Record<string, string> = {
  'p1-riscos-cognitivos':
    'Pilar 1 — riscos cognitivos: o **problema** (primeiro pilar da sequência problema → metodologia → operacionalização).',
  'p2-processos-neuroadaptativos':
    'Pilar 2 — processos neuroadaptativos: a **metodologia**, resposta ao Pilar 1.',
  'p3-ferramentas-solucoes':
    'Pilar 3 — ferramentas e soluções (inclui Executar/MapOS): a **operacionalização** e ponte editorial para o lançamento do Executar.',
};

const awareness: Record<string, string> = {
  'c1-descoberta': 'Estágio de consciência C1 — descoberta.',
  'c2-compreensao': 'Estágio de consciência C2 — compreensão.',
  'c3-decisao': 'Estágio de consciência C3 — decisão.',
};

const editorialStages: Record<string, string> = {
  'topic-packs': 'Pacotes de tópicos que agrupam pautas relacionadas.',
  briefs: 'Briefs de pauta (objetivo, público, pilar, estágio de consciência).',
  research: 'Pesquisa de apoio às pautas.',
  outlines: 'Estruturas (outlines) dos textos.',
  drafts: 'Rascunhos em produção.',
  'fact-check': 'Verificação de fatos e fontes.',
  reviews: 'Revisões editoriais.',
  published: 'Registro do que foi publicado.',
  distribution: 'Planos e registros de distribuição.',
};

const agentNames: Record<string, string> = {
  'a01-research-intelligence': 'pesquisa e inteligência',
  'a02-strategy': 'estratégia',
  'a03-communication': 'comunicação',
  'a04-story': 'narrativa (story)',
  'a05-experience': 'experiência',
  'a06-visual': 'visual',
  'a07-growth': 'crescimento (growth)',
  'a08-governance': 'governança',
  'manager-orchestrator': 'orquestração dos agentes a01–a08',
};

const contractFields: Record<string, string> = {
  input:
    'Entradas de uma tarefa/agente: arquivos, dados, diretórios, referências e variáveis disponíveis.',
  output: 'Entregáveis concretos, formato e schema obrigatório.',
  handoff: 'Passagem de trabalho entre agentes/pessoas: estado, pendências e próxima ação.',
  state:
    'Estados de execução: PREPARED, SUBMITTED, APPROVED, RELEASED, VERIFIED, BLOCKED, USER_ACTION_REQUIRED.',
  acceptance: 'Critérios objetivos de aceite e evidência exigida para DONE.',
};

const services: Record<string, NodeSpec> = {
  crm: {
    responsibility: 'Integração com CRM para leads captados.',
    status: 'BLOCKED',
    gaps: ['G6'],
    evidence: 'Interface em `src/index.ts`; provedor não definido',
  },
  newsletter: {
    responsibility: 'Envio de newsletter e confirmação de inscrição.',
    status: 'BLOCKED',
    gaps: ['G6'],
    evidence: 'Interface em `src/index.ts`; provedor não definido',
  },
  search: {
    responsibility: 'Busca de conteúdo publicado (PostgreSQL full-text search — ADR-002).',
    status: 'SCAFFOLDED',
    gaps: [],
    evidence: 'Interface em `src/index.ts`',
  },
  recommendations: {
    responsibility: 'Recomendações de conteúdo.',
    status: 'BLOCKED',
    gaps: ['G11'],
    evidence: 'Interface em `src/index.ts`; estratégia/provedor não definidos',
  },
  syndication: {
    responsibility: 'Distribuição de conteúdo para canais externos.',
    status: 'BLOCKED',
    gaps: ['G11'],
    evidence: 'Interface em `src/index.ts`; canais não definidos',
  },
};

const agentContract = (id: string, schema: string) =>
  `${JSON.stringify(
    {
      $schema: schema,
      id,
      version: '0.0.0',
      status: 'BLOCKED',
      owner: 'A DEFINIR',
      inputs: [],
      outputs: [],
      depends_on: [],
      blocks: [],
      handoff: null,
      acceptance: [],
      gaps: ['G9'],
    },
    null,
    2,
  )}\n`;

export function specFor(node: AikbNode): NodeSpec {
  const [root, second, third] = node.path.split('/');
  const leaf = node.name;

  switch (root) {
    case 'apps':
      if (!second)
        return {
          responsibility: 'Aplicações executáveis da plataforma.',
          status: 'SCAFFOLDED',
          gaps: [],
          evidence: 'Ver cada app',
        };
      if (second === 'web' && !third)
        return {
          responsibility:
            'App público (Next.js App Router): blog, criadores, recursos, newsletter, planos, sobre, auth e legal.',
          status: 'SCAFFOLDED',
          gaps: ['G5'],
          evidence: 'Implementado na fase 6',
        };
      if (second === 'web')
        return {
          responsibility: `Rota pública \`/${node.path.replace('apps/web/', '')}\` do app web.`,
          status: 'SCAFFOLDED',
          gaps: ['G5'],
          evidence: 'Implementado na fase 6',
        };
      if (second === 'studio')
        return {
          responsibility: 'Operação editorial/CMS (ADR-005).',
          status: 'SCAFFOLDED',
          gaps: [],
          evidence: 'Implementado na fase 7',
        };
      return {
        responsibility: 'Coleta de eventos e telemetria (ADR-005).',
        status: 'SCAFFOLDED',
        gaps: ['G7'],
        evidence: 'Implementado na fase 7',
      };
    case 'packages':
      return {
        responsibility: second
          ? `Pacote compartilhado \`@blog/${second}\`.`
          : 'Pacotes compartilhados entre apps.',
        status: 'SCAFFOLDED',
        gaps: [],
        evidence: 'Implementado na fase 5',
      };
    case 'content':
      return {
        responsibility: second
          ? `Conteúdo publicável do tipo \`${leaf}\`, validado por \`@blog/content-schema\`.`
          : 'Conteúdo publicável (fonte versionada de artigos, autores, tópicos, séries, campanhas, recursos e landing pages).',
        status: 'SCAFFOLDED',
        gaps: ['G10'],
        evidence: 'Estrutura e schema; nenhum conteúdo inventado',
      };
    case 'editorial':
      if (second === 'pilares' && third)
        return {
          responsibility: `${pillars[third] ?? third} Fonte: ${FOUNDATION}.`,
          status: 'SCAFFOLDED',
          gaps: ['G10'],
          evidence: 'Pilar registrado; conteúdo pendente',
        };
      if (second === 'pilares')
        return {
          responsibility: `Três pilares editoriais sequenciais (problema → metodologia → operacionalização). Fonte: ${FOUNDATION}.`,
          status: 'SCAFFOLDED',
          gaps: ['G10'],
          evidence: 'P1–P3 registrados',
        };
      if (second === 'consciencia' && third)
        return {
          responsibility: `${awareness[third] ?? third} Classificação de pautas por estágio de consciência do público.`,
          status: 'SCAFFOLDED',
          gaps: ['G10'],
          evidence: 'Estágio registrado; critérios pendentes',
        };
      if (second === 'consciencia')
        return {
          responsibility:
            'Estágios de consciência do público: C1 descoberta, C2 compreensão, C3 decisão.',
          status: 'SCAFFOLDED',
          gaps: ['G10'],
          evidence: 'C1–C3 registrados',
        };
      if (second)
        return {
          responsibility: `Etapa editorial — ${editorialStages[second] ?? second}`,
          status: 'SCAFFOLDED',
          gaps: ['G10'],
          evidence: 'Etapa registrada; conteúdo pendente',
        };
      return {
        responsibility:
          'Operação editorial: pilares, estágios de consciência e pipeline pauta → publicação → distribuição.',
        status: 'SCAFFOLDED',
        gaps: ['G10'],
        evidence: 'Estrutura registrada',
      };
    case 'knowledge':
      return {
        responsibility: second
          ? `Base de conhecimento do domínio \`${leaf}\`.`
          : 'Base de conhecimento por domínio, usada por editorial e agentes.',
        status: 'SCAFFOLDED',
        gaps: ['G10'],
        evidence: 'Domínio registrado; conteúdo pendente',
      };
    case 'agents':
      if (!second)
        return {
          responsibility: 'Agentes de automação (a01–a08 + orquestrador).',
          status: 'BLOCKED',
          gaps: ['G9'],
          evidence: 'Contratos por agente; especificação ausente',
        };
      return {
        responsibility: `Agente de ${agentNames[second] ?? second}.`,
        status: 'BLOCKED',
        gaps: ['G9'],
        evidence: 'Contrato `agent.contract.json`; especificação funcional ausente',
        files: {
          'agent.contract.json': agentContract(second, '../../schemas/agents/agent.schema.json'),
        },
      };
    case 'workflows':
      if (!second)
        return {
          responsibility:
            'Workflows de orquestração (pesquisa → produção → aquisição → conversão → retenção → aprendizado).',
          status: 'BLOCKED',
          gaps: ['G9'],
          evidence: 'Contratos por workflow; especificação ausente',
        };
      return {
        responsibility: `Workflow \`${second}\`.`,
        status: 'BLOCKED',
        gaps: ['G9'],
        evidence: 'Contrato `workflow.contract.json`; etapas não especificadas',
        files: {
          'workflow.contract.json': agentContract(
            second,
            '../../schemas/workflows/workflow.schema.json',
          ),
        },
      };
    case 'contracts':
      return {
        responsibility: second
          ? `Contrato \`${second}\`: ${contractFields[second] ?? ''}`
          : 'Contratos operacionais (input, output, handoff, state, acceptance) usados por agentes e workflows.',
        status: 'SCAFFOLDED',
        gaps: [],
        evidence: second ? `\`${second}.schema.json\`` : 'Ver subpastas',
      };
    case 'evals':
      return {
        responsibility: second
          ? `Avaliações de qualidade — ${leaf}.`
          : 'Avaliações (rubricas e verificações) por dimensão de qualidade.',
        status: 'BLOCKED',
        gaps: ['G9'],
        evidence: 'Rubricas não especificadas',
      };
    case 'policies':
      if (second === 'accessibility')
        return {
          responsibility:
            'Política de acessibilidade: WCAG 2.2 AA e notas de acessibilidade do ZIP de Design System.',
          status: 'SCAFFOLDED',
          gaps: [],
          evidence: 'Regras aplicadas por jest-axe e @axe-core/playwright',
        };
      if (second === 'privacy' || second === 'security')
        return {
          responsibility: `Política de ${second === 'privacy' ? 'privacidade' : 'segurança'}.`,
          status: 'BLOCKED',
          gaps: ['G12'],
          evidence: 'Texto da política não fornecido',
        };
      return {
        responsibility: second
          ? `Política \`${second}\`.`
          : 'Políticas (linguística, terminologia, voz, acessibilidade, marca, editorial, privacidade, segurança).',
        status: second ? 'BLOCKED' : 'SCAFFOLDED',
        gaps: ['G9'],
        evidence: second ? 'Regras não especificadas' : 'Ver subpastas',
      };
    case 'examples':
      return {
        responsibility: 'Exemplos de referência (bons exemplos) para editorial, agentes e evals.',
        status: 'SCAFFOLDED',
        gaps: ['G10'],
        evidence: 'Nenhum exemplo inventado',
      };
    case 'anti-examples':
      return {
        responsibility: 'Anti-exemplos (o que evitar) para editorial, agentes e evals.',
        status: 'SCAFFOLDED',
        gaps: ['G10'],
        evidence: 'Nenhum anti-exemplo inventado',
      };
    case 'services':
      if (!second)
        return {
          responsibility:
            'Serviços de integração (CRM, newsletter, busca, recomendações, sindicação).',
          status: 'SCAFFOLDED',
          gaps: [],
          evidence: 'Ver cada serviço',
        };
      return (
        services[second] ?? { responsibility: second, status: 'BLOCKED', gaps: [], evidence: '' }
      );
    case 'data':
      return {
        responsibility: second
          ? `Dados operacionais: \`${leaf}\`.`
          : 'Dados operacionais (eventos, leads, performance, audiência, estado, evidências). Dados reais não são versionados.',
        status: 'SCAFFOLDED',
        gaps:
          second === 'events' || second === 'content-performance' || second === 'audience'
            ? ['G7']
            : [],
        evidence: 'Política de dados registrada',
      };
    case 'schemas':
      return {
        responsibility: second
          ? `JSON Schemas de \`${second}\`.`
          : 'JSON Schemas canônicos (conteúdo, tarefas, agentes, workflows, estado, evidências, evals, analytics).',
        status: 'SCAFFOLDED',
        gaps: [],
        evidence: 'Ver arquivos `*.schema.json`',
      };
    case 'infrastructure':
      if (second === 'ci-cd')
        return {
          responsibility: 'CI/CD — GitHub Actions (`.github/workflows/`).',
          status: 'SCAFFOLDED',
          gaps: [],
          evidence: 'Implementado na fase 8',
        };
      if (second === 'environments')
        return {
          responsibility: 'Matriz de ambientes e variáveis (validadas por Zod em cada app).',
          status: 'SCAFFOLDED',
          gaps: ['G8'],
          evidence: 'Implementado nas fases 6–7',
        };
      return {
        responsibility: second
          ? `Infraestrutura — ${leaf} (Cloudflare, ADR-004).`
          : 'Infraestrutura (ambientes, CDN, DNS, observabilidade, CI/CD, segurança).',
        status: second ? 'BLOCKED' : 'SCAFFOLDED',
        gaps: ['G8'],
        evidence: second ? 'Conta Cloudflare/domínio não definidos' : 'Ver subpastas',
      };
    case 'migrations':
      if (second === 'redirects')
        return {
          responsibility: 'Mapa versionado de redirects (origem → destino, status HTTP).',
          status: 'SCAFFOLDED',
          gaps: [],
          evidence: '`redirects.schema.json` + `redirects.json`',
        };
      if (second === 'content')
        return {
          responsibility: 'Migrações de conteúdo (importação/transformação de conteúdo existente).',
          status: 'SCAFFOLDED',
          gaps: ['G10'],
          evidence: 'Nenhum conteúdo de origem informado',
        };
      return {
        responsibility:
          'Migrações de conteúdo e redirects (migrations de banco ficam em `packages/database/migrations`).',
        status: 'SCAFFOLDED',
        gaps: [],
        evidence: 'Ver subpastas',
      };
    case 'docs':
      if (second === 'architecture')
        return {
          responsibility: 'Arquitetura alvo e matriz de cobertura AIKB-0003.',
          status: 'IMPLEMENTED',
          gaps: [],
          evidence: '`target-architecture.md`, `aikb-0003-coverage.md`',
        };
      if (second === 'decisions')
        return {
          responsibility: 'ADRs (ADR-001 a ADR-006).',
          status: 'IMPLEMENTED',
          gaps: [],
          evidence: 'ADR-001..006',
        };
      if (second === 'url-governance')
        return {
          responsibility: 'Governança de URLs: mapa de rotas públicas derivado do AIKB-0003.',
          status: 'IMPLEMENTED',
          gaps: [],
          evidence: '`routes.md`',
        };
      if (second === 'taxonomy')
        return {
          responsibility: 'Taxonomia editorial: pilares P1–P3 e estágios de consciência C1–C3.',
          status: 'IMPLEMENTED',
          gaps: [],
          evidence: '`taxonomy.md`',
        };
      if (second === 'tracking-plan')
        return {
          responsibility: 'Plano de tracking (eventos, propriedades, destinos).',
          status: 'BLOCKED',
          gaps: ['G7'],
          evidence: 'Envelope de evento em `@blog/analytics-schema`; plano não especificado',
        };
      if (second)
        return {
          responsibility: `Documentação — ${leaf}.`,
          status: 'SCAFFOLDED',
          gaps: ['G9'],
          evidence: 'Nenhum procedimento especificado',
        };
      return {
        responsibility: 'Documentação do projeto.',
        status: 'IMPLEMENTED',
        gaps: [],
        evidence: 'Ver subpastas',
      };
    default:
      return { responsibility: leaf, status: 'SCAFFOLDED', gaps: [], evidence: '' };
  }
}
