/**
 * Verifies that @blog/database declares every column Better Auth expects
 * (better-auth/db `getAuthTables`) with the configured additional fields.
 */
import { getTableColumns } from 'drizzle-orm';
import { getAuthTables } from 'better-auth/db';
import { account, session, user, verification } from '@blog/database';

const tables = { user, session, account, verification } as const;
const expected = getAuthTables({
  user: { additionalFields: { role: { type: 'string', required: false, input: false } } },
});

const problems: string[] = [];
for (const [model, definition] of Object.entries(expected)) {
  const table = tables[model as keyof typeof tables];
  if (!table) {
    problems.push(`missing table ${model}`);
    continue;
  }
  const columns = getTableColumns(table) as Record<string, { notNull: boolean }>;
  for (const [field, attrs] of Object.entries(definition.fields)) {
    const column = columns[field];
    if (!column) problems.push(`${model}.${field} missing`);
    else if (attrs.required !== false && !column.notNull)
      problems.push(`${model}.${field} must be NOT NULL`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`Better Auth tables verified: ${Object.keys(expected).join(', ')}`);
