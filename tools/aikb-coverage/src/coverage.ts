import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parseAikb, realPath, REPO_ROOT, STATUSES, type Status } from './aikb';

export interface CoverageRow {
  item: string;
  path: string;
  status: Status | 'MISSING';
  evidence: string;
  problems: string[];
}

const STATUS_LINE = /^\|\s*Status\s*\|\s*`?([A-Z]+)`?\s*\|/m;
const EVIDENCE_LINE = /^\|\s*Evidência\s*\|\s*(.+?)\s*\|\s*$/m;

export function readStatus(dir: string): { status: Status | undefined; evidence: string } {
  const file = join(dir, 'STATUS.md');
  if (!existsSync(file)) return { status: undefined, evidence: '' };
  const text = readFileSync(file, 'utf8');
  const status = STATUS_LINE.exec(text)?.[1] as Status | undefined;
  return {
    status: status && (STATUSES as readonly string[]).includes(status) ? status : undefined,
    evidence: EVIDENCE_LINE.exec(text)?.[1] ?? '',
  };
}

export function computeCoverage(root: string = REPO_ROOT): CoverageRow[] {
  return parseAikb().map((node) => {
    const path = realPath(node.path);
    const dir = join(root, path);
    const problems: string[] = [];
    if (!existsSync(dir) || !statSync(dir).isDirectory()) problems.push('directory missing');
    if (!existsSync(join(dir, 'README.md'))) problems.push('README.md missing');
    const { status, evidence } = readStatus(dir);
    if (!status) problems.push('STATUS.md missing or without a valid status');
    return {
      item: node.path,
      path,
      status: problems.length ? 'MISSING' : (status as Status),
      evidence,
      problems,
    };
  });
}
