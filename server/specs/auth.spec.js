import { describe, expect, it, beforeAll, jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

jest.unstable_mockModule('../db.js', () => ({
  default: jest.fn(),
}));

beforeAll(async () => {
  const router = (await import('../api/api.js')).default;

  app.use(express.json());
  app.use(cookieParser());
  app.use('/api', router);
});

describe('POST /auth/register', () => {
  it('requires password field', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'alice@bob.com' })
      .set('Accept', 'application/json')
      .expect(400);

    expect(res.body).toHaveProperty('errors');
  });

  it('requires email field', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ password: 'testpassword' })
      .set('Accept', 'application/json')
      .expect(400);

    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0]).toMatchObject({ field: 'email', message: 'Email is required'});
  });

  it('requires a unique email', async () => {

  })

});
