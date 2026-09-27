import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { analyticsBatchSchema, analyticsEventSchema } from './index';
import { analyticsJsonSchemas } from '../scripts/json-schemas';

const event = {
  name: 'page_view',
  occurredAt: '2026-09-27T12:00:00.000Z',
  source: 'web',
  path: '/blog',
};

describe('analytics envelope', () => {
  it('accepts a minimal event and rejects unknown fields', () => {
    expect(analyticsEventSchema.safeParse(event).success).toBe(true);
    expect(analyticsEventSchema.safeParse({ ...event, email: 'x@y.z' }).success).toBe(false);
  });

  it('bounds batch size', () => {
    expect(analyticsBatchSchema.safeParse({ events: [] }).success).toBe(false);
    expect(analyticsBatchSchema.safeParse({ events: Array(51).fill(event) }).success).toBe(false);
  });

  it('keeps schemas/analytics in sync', () => {
    for (const [name, schema] of Object.entries(analyticsJsonSchemas())) {
      const file = join(__dirname, '..', '..', '..', 'schemas', 'analytics', `${name}.schema.json`);
      expect(JSON.parse(readFileSync(file, 'utf8'))).toEqual(schema);
    }
  });
});
