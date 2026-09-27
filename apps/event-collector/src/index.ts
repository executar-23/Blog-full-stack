import { handleRequest, type CollectorEnv } from './handler';

export default {
  fetch(request: Request, env: CollectorEnv): Promise<Response> {
    return handleRequest(request, env);
  },
};
