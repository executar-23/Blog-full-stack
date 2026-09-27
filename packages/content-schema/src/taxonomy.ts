import { z } from 'zod';

/** Editorial pillars — docs/taxonomy/taxonomy.md (Foundation Doc + AIKB-0003). */
export const pillarSchema = z
  .enum(['P1', 'P2', 'P3'])
  .describe(
    'P1 riscos cognitivos (problema) · P2 processos neuroadaptativos (metodologia) · P3 ferramentas e soluções (operacionalização)',
  );
export type Pillar = z.infer<typeof pillarSchema>;

export const pillarDirectories: Record<Pillar, string> = {
  P1: 'editorial/pilares/p1-riscos-cognitivos',
  P2: 'editorial/pilares/p2-processos-neuroadaptativos',
  P3: 'editorial/pilares/p3-ferramentas-solucoes',
};

/** Awareness stages — AIKB-0003 `editorial/consciencia/`. */
export const awarenessSchema = z
  .enum(['C1', 'C2', 'C3'])
  .describe('C1 descoberta · C2 compreensão · C3 decisão');
export type Awareness = z.infer<typeof awarenessSchema>;

export const awarenessDirectories: Record<Awareness, string> = {
  C1: 'editorial/consciencia/c1-descoberta',
  C2: 'editorial/consciencia/c2-compreensao',
  C3: 'editorial/consciencia/c3-decisao',
};
