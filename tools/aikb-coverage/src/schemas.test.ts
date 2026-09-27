import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import { REPO_ROOT } from './aikb';

const SCHEMA_ROOTS = ['contracts', 'schemas', 'migrations'];

function walk(dir: string, predicate: (file: string) => boolean): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, predicate);
    return predicate(entry.name) ? [full] : [];
  });
}

const read = (file: string) => JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;

const schemaFiles = SCHEMA_ROOTS.flatMap((root) =>
  walk(join(REPO_ROOT, root), (name) => name.endsWith('.schema.json')),
);

function createAjv() {
  const ajv = new Ajv2020({ strict: true, allErrors: true });
  addFormats(ajv);
  for (const file of schemaFiles) ajv.addSchema(read(file));
  return ajv;
}

describe('JSON Schemas', () => {
  const ajv = createAjv();

  it.each(schemaFiles.map((f) => [relative(REPO_ROOT, f), f] as const))(
    '%s compiles',
    (rel, file) => {
      const schema = read(file);
      expect(schema['$id']).toBe(`https://creator-led-platform.local/${rel}`);
      expect(() => ajv.getSchema(schema['$id'] as string)).not.toThrow();
      expect(ajv.getSchema(schema['$id'] as string)).toBeDefined();
    },
  );

  const contracts = [
    ...walk(join(REPO_ROOT, 'agents'), (n) => n === 'agent.contract.json').map(
      (f) => [f, 'schemas/agents/agent.schema.json'] as const,
    ),
    ...walk(join(REPO_ROOT, 'workflows'), (n) => n === 'workflow.contract.json').map(
      (f) => [f, 'schemas/workflows/workflow.schema.json'] as const,
    ),
    [
      join(REPO_ROOT, 'migrations/redirects/redirects.json'),
      'migrations/redirects/redirects.schema.json',
    ] as const,
  ];

  it.each(contracts.map(([f, s]) => [relative(REPO_ROOT, f), f, s] as const))(
    '%s is valid',
    (_, file, schema) => {
      const validate = ajv.getSchema(`https://creator-led-platform.local/${schema}`);
      const data = read(file);
      expect(validate?.(data)).toBe(true);
    },
  );
});
