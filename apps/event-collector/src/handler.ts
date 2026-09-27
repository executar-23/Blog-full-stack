import { analyticsBatchSchema } from '@blog/analytics-schema';
import { createLogger, type Logger } from '@blog/config';

export interface CollectorEnv {
  /** Comma-separated list of origins allowed to post events (CORS). */
  ALLOWED_ORIGINS?: string;
}

const MAX_BODY_BYTES = 64 * 1024;

function corsHeaders(request: Request, env: CollectorEnv): Record<string, string> {
  const origin = request.headers.get('origin');
  const allowed = (env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  if (!origin || !allowed.includes(origin)) return {};
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    vary: 'origin',
  };
}

const json = (body: unknown, status: number, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });

/**
 * POST /v1/events — validates a batch against @blog/analytics-schema and
 * accepts it (202). No storage/provider destination is configured yet (G7):
 * only aggregate counts are logged, never event payloads.
 */
export async function handleRequest(
  request: Request,
  env: CollectorEnv,
  logger: Logger = createLogger({ base: { app: 'event-collector' } }),
): Promise<Response> {
  const url = new URL(request.url);
  const cors = corsHeaders(request, env);

  if (url.pathname === '/health') return json({ status: 'ok' }, 200);
  if (url.pathname !== '/v1/events') return json({ error: 'not_found' }, 404);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (request.method !== 'POST')
    return json({ error: 'method_not_allowed' }, 405, { allow: 'POST, OPTIONS' });
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ error: 'unsupported_media_type' }, 415, cors);
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES)
    return json({ error: 'payload_too_large' }, 413, cors);

  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    return json({ error: 'invalid_json' }, 400, cors);
  }

  const parsed = analyticsBatchSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ error: 'invalid_events', issues: parsed.error.issues.length }, 422, cors);
  }

  logger.info('events accepted', { count: parsed.data.events.length, destination: 'none (G7)' });
  return json({ accepted: parsed.data.events.length }, 202, cors);
}
