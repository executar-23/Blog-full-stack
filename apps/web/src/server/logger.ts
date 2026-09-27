import { createLogger } from '@blog/config';
import { env } from '../env';

export const logger = createLogger({ level: env.LOG_LEVEL, base: { app: 'web' } });
