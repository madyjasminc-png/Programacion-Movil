const request = require('supertest');
const app = require('../server');
const db = require('../config/db');

// Set NODE_ENV to test
process.env.NODE_ENV = 'test';

describe('API Endpoints', () => {
  // Asegurar que cerramos el pool de BD después de las pruebas
  afterAll(async () => {
    await db.end();
  });

  describe('GET /api/v1/health', () => {
    it('debería retornar 200 y status ok', async () => {
      const res = await request(app).get('/api/v1/health');
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('ok');
    });
  });

  describe('GET /api/v1/challenges', () => {
    it('debería obtener la lista de retos', async () => {
      const res = await request(app).get('/api/v1/challenges');
      expect(res.statusCode).toEqual(200);
      expect(res.body.error).toBe(false);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/v1/community', () => {
    it('debería obtener la lista de la comunidad', async () => {
      const res = await request(app).get('/api/v1/community');
      expect(res.statusCode).toEqual(200);
      expect(res.body.error).toBe(false);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
});
