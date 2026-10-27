import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pino } from 'pino';
import { createApp } from './app.js';
import { loadEnv } from './config/env.js';
import { createPrisma } from './db/prisma.js';

const env = loadEnv();
const logger = pino({ level: env.LOG_LEVEL });
const prisma = createPrisma(env.DATABASE_URL);

const here = path.dirname(fileURLToPath(import.meta.url));
// apps/api/dist (or src) -> apps/web/dist
const webDistDir = path.resolve(here, '../../web/dist');

const app = createApp({
  checkDb: async () => {
    await prisma.$queryRaw`SELECT 1`;
  },
  webDistDir,
  logger,
});

const server = app.listen(env.PORT, () => {
  logger.info({ port: env.PORT, env: env.NODE_ENV }, 'api listening');
});

function shutdown(signal: string) {
  logger.info({ signal }, 'shutting down');
  server.close(() => {
    void prisma.$disconnect().finally(() => process.exit(0));
  });
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
