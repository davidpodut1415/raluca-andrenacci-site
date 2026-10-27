import { existsSync } from 'node:fs';
import path from 'node:path';
import compression from 'compression';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { pino, type Logger } from 'pino';
import { pinoHttp } from 'pino-http';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { healthRouter } from './routes/health.js';

export interface AppDeps {
  checkDb: () => Promise<void>;
  /** Built SPA directory; when it exists, it is served with an index.html fallback. */
  webDistDir?: string;
  logger?: Logger;
}

export function createApp({ checkDb, webDistDir, logger = pino({ level: 'silent' }) }: AppDeps) {
  const app: Express = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1); // Render terminates TLS in front of the service
  app.use(pinoHttp({ logger }));
  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: '100kb' }));

  app.use('/api', healthRouter(checkDb));
  app.use('/api', notFoundHandler);

  if (webDistDir && existsSync(path.join(webDistDir, 'index.html'))) {
    app.use(
      '/assets',
      express.static(path.join(webDistDir, 'assets'), { immutable: true, maxAge: '1y' }),
    );
    app.use(express.static(webDistDir, { index: false, maxAge: '1h' }));
    app.get('/{*splat}', (_req, res) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(path.join(webDistDir, 'index.html'));
    });
  }

  app.use(errorHandler);
  return app;
}
