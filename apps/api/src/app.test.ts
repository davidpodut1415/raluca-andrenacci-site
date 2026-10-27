import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from './app.js';

describe('api app', () => {
  it('GET /api/health returns ok when the database responds', async () => {
    const app = createApp({ checkDb: async () => {} });
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('GET /api/health returns 503 when the database is down', async () => {
    const app = createApp({
      checkDb: async () => {
        throw new Error('connection refused');
      },
    });
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(503);
    expect(res.body.status).toBe('degraded');
  });

  it('unknown /api routes return a JSON 404', async () => {
    const app = createApp({ checkDb: async () => {} });
    const res = await request(app).get('/api/nope');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('not_found');
  });

  it('sets security headers', async () => {
    const app = createApp({ checkDb: async () => {} });
    const res = await request(app).get('/api/health');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});
