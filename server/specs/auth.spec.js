import { describe, expect, it, beforeAll, beforeEach, jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

const mockVerify = jest.fn();

jest.unstable_mockModule('argon2', () => ({
  verify: mockVerify,
  hash: jest.fn(),
}));

export const mockSelect = jest.fn();
export const mockWhere = jest.fn();
export const mockFirst = jest.fn();
export const mockInsert = jest.fn();
export const mockReturning = jest.fn();

export const mockDb = jest.fn(() => ({
  select: mockSelect,
  where: mockWhere,
  first: mockFirst,
  insert: mockInsert,
  returning: mockReturning,
}));

jest.unstable_mockModule('../db.js', () => ({
  default: mockDb,
}));

beforeAll(async () => {
  const router = (await import('../api/api.js')).default;

  app.use(express.json());
  app.use(cookieParser());
  app.use('/api', router);
});

beforeEach(() => {
  jest.clearAllMocks();

  mockDb.mockReturnValue({
    select: mockSelect,
    where: mockWhere,
    first: mockFirst,
    insert: mockInsert,
    returning: mockReturning,
  });

  mockSelect.mockReturnThis();
  mockWhere.mockReturnThis();
  mockFirst.mockResolvedValue(null);
  mockInsert.mockResolvedValue([1]);
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

    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0]).toMatchObject({ field: 'email', message: 'Email is required' });
  });

  it('allows spaces in the password', async () => {
    mockFirst.mockResolvedValue(undefined);

    const res = await request(app).post('/api/auth/register').send({
      email: 'alice@bob.com',
      password: 'my secure password',
    });

    expect(res.status).toBe(201);
  });

  it('requires min password length', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'alice@bob.com', password: '123456789' })
      .expect(400);

    expect(res.body.errors).toHaveLength(1);
  });

  it('requires a unique email', async () => {
    mockFirst.mockResolvedValue({
      id: 1,
      email: 'alice@bob.com',
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'alice@bob.com',
        password: 'testpassword',
      })
      .expect(400);

    expect(res.body).toHaveProperty('errors');
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it('fails registration if db insert fails', async () => {
    mockInsert.mockRejectedValue(new Error('Database error'));

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'alice@bob.com',
        password: 'testpassword',
      })
      .expect(500);

    expect(res.body).toMatchObject({ msg: 'unable to register user' });
  });

  it('returns 201 if registration is successful', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'alice@bob.com',
        password: 'testpassword',
      })
      .expect(201);

    expect(res.body).toBeDefined();
    expect(mockInsert).toHaveBeenCalled();
  });
});


describe('POST /auth/login', () => {
  it('requires email field', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ password: 'testpassword' })
      .expect(400);

    expect(res.body).toHaveProperty('errors');
  });

  it('requires password field', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'alice@bob.com' })
      .expect(400);

    expect(res.body).toHaveProperty('errors');
  });

  it('requires a valid email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'not-an-email',
        password: 'testpassword',
      })
      .expect(400);

    expect(res.body).toHaveProperty('errors');
  });

  it('returns 401 if user does not exist', async () => {
    mockFirst.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'alice@bob.com',
        password: 'testpassword',
      })
      .expect(401);

    expect(res.body).toBeDefined();
    expect(mockVerify).toHaveBeenCalled();
  });

  it('returns 401 if password is incorrect', async () => {
    mockFirst.mockResolvedValue({
      id: 1,
      email: 'alice@bob.com',
      // eslint-disable-next-line camelcase
      passwd_hash: 'hashedpassword',
    });
    mockVerify.mockResolvedValue(false);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'alice@bob.com',
        password: 'wrongpassword',
      })
      .expect(401);

    expect(res.body).toBeDefined();
  });

  it('returns 200 if login is successful', async () => {
    mockFirst.mockResolvedValue({
      id: 1,
      email: 'alice@bob.com',
      // eslint-disable-next-line camelcase
      passwd_hash: 'hashedpassword',
    });
    mockVerify.mockResolvedValue(true);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'alice@bob.com',
        password: 'testpassword',
      })
      .expect(200);

    expect(res.body).toBeDefined();
  });

  it('sets an authentication cookie on successful login', async () => {
    mockFirst.mockResolvedValue({
      id: 1,
      email: 'alice@bob.com',
      // eslint-disable-next-line camelcase
      passwd_hash: 'hashedpassword',
    });
    mockVerify.mockResolvedValue(true);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'alice@bob.com',
        password: 'testpassword',
      })
      .expect(200);

    expect(res.headers['set-cookie']).toBeDefined();
    expect(res.headers['set-cookie'][0]).toContain('HttpOnly');
  });

  it('does not return the hashed password', async () => {
    mockFirst.mockResolvedValue({
      id: 1,
      email: 'alice@bob.com',
      // eslint-disable-next-line camelcase
      passwd_hash: 'hashedpassword',
    });
    mockVerify.mockReturnValue(true);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'alice@bob.com',
        password: 'testpassword',
      })
      .expect(200);

    expect(res.body.password).toBeUndefined();
  });

  it('returns 500 if database query fails', async () => {
    mockFirst.mockRejectedValue(new Error('Database error'));

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'alice@bob.com',
        password: 'testpassword',
      })
      .expect(500);

    expect(res.body).toBeDefined();
  });
});

describe('POST /auth/logout', () => {});

describe('GET /auth/me', () => {});
