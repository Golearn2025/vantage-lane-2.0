import pino from 'pino'

const isDevelopment = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

// Pino logger configuration
export const logger = pino({
  level: process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),

  // Pretty print only in development
  ...(isDevelopment && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  }),

  // Structured logging in production
  ...(!isDevelopment &&
    !isTest && {
      formatters: {
        level: label => ({ level: label }),
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    }),

  // Silence in test environment
  ...(isTest && { level: 'silent' }),
})

// Typed logger methods for better DX
export const log = {
  info: (message: string, meta?: Record<string, unknown>) => logger.info(meta, message),

  error: (message: string, error?: Error | unknown, meta?: Record<string, unknown>) =>
    logger.error({ ...meta, error }, message),

  warn: (message: string, meta?: Record<string, unknown>) => logger.warn(meta, message),

  debug: (message: string, meta?: Record<string, unknown>) => logger.debug(meta, message),

  trace: (message: string, meta?: Record<string, unknown>) => logger.trace(meta, message),
}
