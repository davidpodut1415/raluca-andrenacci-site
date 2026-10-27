import { Router } from 'express';

/** Render health check. Returns 503 when the database is unreachable. */
export function healthRouter(checkDb: () => Promise<void>): Router {
  const router = Router();

  router.get('/health', async (req, res) => {
    try {
      await checkDb();
      res.json({ status: 'ok' });
    } catch (err) {
      req.log.error({ err }, 'health check failed');
      res.status(503).json({ status: 'degraded', db: 'down' });
    }
  });

  return router;
}
