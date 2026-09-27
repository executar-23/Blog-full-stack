import { createLogger } from './logger';

describe('createLogger', () => {
  const now = () => new Date('2026-09-27T00:00:00.000Z');

  it('writes one JSON line with level, message and fields', () => {
    const lines: string[] = [];
    createLogger({ write: (line) => lines.push(line), now }).info('hello', { route: '/' });
    expect(JSON.parse(lines[0] ?? '')).toEqual({
      time: '2026-09-27T00:00:00.000Z',
      level: 'info',
      message: 'hello',
      route: '/',
    });
  });

  it('filters entries below the configured level', () => {
    const lines: string[] = [];
    const logger = createLogger({ level: 'warn', write: (line) => lines.push(line), now });
    logger.info('ignored');
    logger.error('kept');
    expect(lines).toHaveLength(1);
  });

  it('serializes errors and merges child fields', () => {
    const lines: string[] = [];
    const logger = createLogger({ write: (line) => lines.push(line), now, base: { app: 'web' } });
    logger.child({ requestId: 'r1' }).error('boom', { error: new Error('bad') });
    const entry = JSON.parse(lines[0] ?? '');
    expect(entry.app).toBe('web');
    expect(entry.requestId).toBe('r1');
    expect(entry.error.message).toBe('bad');
  });
});
