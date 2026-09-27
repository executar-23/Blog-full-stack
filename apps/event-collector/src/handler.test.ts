import { createLogger } from '@blog/config';
import { handleRequest } from './handler';

const logger = createLogger({ write: () => undefined });
const env = { ALLOWED_ORIGINS: 'https://site.test' };
const event = {
  name: 'page_view',
  occurredAt: '2026-09-27T12:00:00.000Z',
  source: 'web',
  path: '/blog',
};

const post = (body: unknown, headers: Record<string, string> = {}) =>
  new Request('https://collector.test/v1/events', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://site.test', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

describe('event collector', () => {
  it('accepts a valid batch with CORS for allowed origins', async () => {
    const response = await handleRequest(post({ events: [event] }), env, logger);
    expect(response.status).toBe(202);
    expect(await response.json()).toEqual({ accepted: 1 });
    expect(response.headers.get('access-control-allow-origin')).toBe('https://site.test');
  });

  it('rejects invalid payloads', async () => {
    expect((await handleRequest(post('{'), env, logger)).status).toBe(400);
    expect(
      (await handleRequest(post({ events: [{ ...event, name: 'Bad Name' }] }), env, logger)).status,
    ).toBe(422);
    expect(
      (
        await handleRequest(
          post({ events: [event] }, { 'content-type': 'text/plain' }),
          env,
          logger,
        )
      ).status,
    ).toBe(415);
  });

  it('does not grant CORS to unknown origins', async () => {
    const response = await handleRequest(
      post({ events: [event] }, { origin: 'https://evil.test' }),
      env,
      logger,
    );
    expect(response.headers.get('access-control-allow-origin')).toBeNull();
  });

  it('answers health checks and unknown routes', async () => {
    expect(
      (await handleRequest(new Request('https://collector.test/health'), env, logger)).status,
    ).toBe(200);
    expect((await handleRequest(new Request('https://collector.test/x'), env, logger)).status).toBe(
      404,
    );
    expect(
      (await handleRequest(new Request('https://collector.test/v1/events'), env, logger)).status,
    ).toBe(405);
  });
});
