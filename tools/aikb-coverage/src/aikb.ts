import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

function findRepoRoot(start: string): string {
  let dir = start;
  while (!existsSync(join(dir, 'nx.json'))) {
    const parent = dirname(dir);
    if (parent === dir) throw new Error('nx.json not found above ' + start);
    dir = parent;
  }
  return dir;
}

export const REPO_ROOT = findRepoRoot(process.cwd());
export const AIKB_FILE = 'docs/sources/AIKB-0003/AIKB-0003__conceito-blog-full-stack.txt';

export interface AikbNode {
  /** Path exactly as written in AIKB-0003, relative to the platform root. */
  path: string;
  depth: number;
  name: string;
}

const LINE = /^((?:│ {3}| {4})*)(?:├── |└── )(.+)\/$/u;

/** Parses the AIKB-0003 tree (every directory, in document order). */
export function parseAikb(
  text: string = readFileSync(join(REPO_ROOT, AIKB_FILE), 'utf8'),
): AikbNode[] {
  const stack: string[] = [];
  const nodes: AikbNode[] = [];
  for (const line of text.split('\n').slice(1)) {
    const match = LINE.exec(line);
    if (!match?.[2]) continue;
    const depth = (match[1] ?? '').length / 4;
    stack.length = depth;
    stack.push(match[2]);
    nodes.push({ path: stack.join('/'), depth, name: match[2] });
  }
  return nodes;
}

/**
 * Real repository path of an AIKB node. Routes of `apps/web/*` live in the
 * Next.js App Router directory (ADR-006, implementation note).
 */
export function realPath(aikbPath: string): string {
  return aikbPath.startsWith('apps/web/')
    ? aikbPath.replace('apps/web/', 'apps/web/src/app/')
    : aikbPath;
}

export const STATUSES = ['IMPLEMENTED', 'SCAFFOLDED', 'BLOCKED'] as const;
export type Status = (typeof STATUSES)[number];
