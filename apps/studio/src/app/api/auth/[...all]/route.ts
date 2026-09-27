import { toNextJsHandler } from 'better-auth/next-js';
import { getAuth } from '../../../../server/auth';

export const dynamic = 'force-dynamic';

const unavailable = () => new Response('Auth not configured', { status: 503 });

export async function GET(request: Request): Promise<Response> {
  const auth = getAuth();
  return auth ? toNextJsHandler(auth).GET(request) : unavailable();
}

export async function POST(request: Request): Promise<Response> {
  const auth = getAuth();
  return auth ? toNextJsHandler(auth).POST(request) : unavailable();
}
