/** Writes schemas/content/*.schema.json from the Zod schemas (AIKB-0003 `schemas/content`). */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'zod';
import { contentSchemas } from '../src/index';

export function contentJsonSchemas(): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(contentSchemas).map(([name, schema]) => [
      name,
      {
        $id: `https://creator-led-platform.local/schemas/content/${name}.schema.json`,
        ...z.toJSONSchema(schema, { target: 'draft-2020-12', io: 'input' }),
      },
    ]),
  );
}

if (process.argv[1]?.endsWith('json-schemas.ts')) {
  const dir = join(process.cwd(), '..', '..', 'schemas', 'content');
  for (const [name, schema] of Object.entries(contentJsonSchemas())) {
    writeFileSync(join(dir, `${name}.schema.json`), `${JSON.stringify(schema, null, 2)}\n`);
  }
  console.log(`wrote ${Object.keys(contentSchemas).length} schemas to ${dir}`);
}
