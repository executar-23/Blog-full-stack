import { parseAikb, realPath } from './aikb';
import { computeCoverage } from './coverage';

describe('AIKB-0003 parser', () => {
  const nodes = parseAikb();

  it('reads every directory of the tree', () => {
    expect(nodes).toHaveLength(165);
    expect(nodes.filter((n) => n.depth === 0).map((n) => n.name)).toEqual([
      'apps',
      'packages',
      'content',
      'editorial',
      'knowledge',
      'agents',
      'workflows',
      'contracts',
      'evals',
      'policies',
      'examples',
      'anti-examples',
      'services',
      'data',
      'schemas',
      'infrastructure',
      'migrations',
      'docs',
    ]);
    expect(nodes.map((n) => n.path)).toContain('editorial/pilares/p1-riscos-cognitivos');
  });

  it('maps web routes to the App Router directory', () => {
    expect(realPath('apps/web/legal/cookies')).toBe('apps/web/src/app/legal/cookies');
    expect(realPath('apps/web')).toBe('apps/web');
    expect(realPath('apps/studio')).toBe('apps/studio');
  });
});

describe('ADR-006 acceptance: 100% of AIKB-0003 represented', () => {
  it.each(computeCoverage().map((r) => [r.item, r] as const))('%s', (_, row) => {
    expect(row.problems).toEqual([]);
  });
});
