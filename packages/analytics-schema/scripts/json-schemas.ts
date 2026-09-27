/** Writes schemas/analytics/*.schema.json from the Zod schemas. */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'zod';
import { analyticsBatchSchema, analyticsEventSchema } from '../src/index';

export function analyticsJsonSchemas(): Record<string, unknown> {
  const entries = { event: analyticsEventSchema, batch: analyticsBatchSchema };
  return Object.fromEntries(
    Object.entries(entries).map(([name, schema]) => [
      name,
      {
        $id: `https://creator-led-platform.local/schemas/analytics/${name}.schema.json`,
        ...z.toJSONSchema(schema, { target: 'draft-2020-12', io: 'input' }),
      },
    ]),
  );
}

if (process.argv[1]?.endsWith('json-schemas.ts')) {
  const dir = join(process.cwd(), '..', '..', 'schemas', 'analytics');
  for (const [name, schema] of Object.entries(analyticsJsonSchemas())) {
    writeFileSync(join(dir, `${name}.schema.json`), `${JSON.stringify(schema, null, 2)}\n`);
  }
  console.log(`wrote analytics schemas to ${dir}`);
}
