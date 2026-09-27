export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type LogFields = Record<string, unknown>;

export interface Logger {
  debug(message: string, fields?: LogFields): void;
  info(message: string, fields?: LogFields): void;
  warn(message: string, fields?: LogFields): void;
  error(message: string, fields?: LogFields): void;
  child(fields: LogFields): Logger;
}

const levelOrder: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

export interface LoggerOptions {
  level?: LogLevel;
  base?: LogFields;
  write?: (line: string) => void;
  now?: () => Date;
}

function serializeError(value: unknown): unknown {
  if (value instanceof Error) {
    return { name: value.name, message: value.message, stack: value.stack };
  }
  return value;
}

/** Structured JSON logger (one line per event), safe for Workers and Node. */
export function createLogger(options: LoggerOptions = {}): Logger {
  const minimum = levelOrder[options.level ?? 'info'];
  const base = options.base ?? {};
  const write = options.write ?? ((line: string) => console.log(line));
  const now = options.now ?? (() => new Date());

  const emit = (level: LogLevel, message: string, fields: LogFields = {}) => {
    if (levelOrder[level] < minimum) return;
    const entry: LogFields = { time: now().toISOString(), level, message, ...base };
    for (const [key, value] of Object.entries(fields)) entry[key] = serializeError(value);
    write(JSON.stringify(entry));
  };

  return {
    debug: (message, fields) => emit('debug', message, fields),
    info: (message, fields) => emit('info', message, fields),
    warn: (message, fields) => emit('warn', message, fields),
    error: (message, fields) => emit('error', message, fields),
    child: (fields) => createLogger({ ...options, base: { ...base, ...fields } }),
  };
}
