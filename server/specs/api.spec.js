import {describe, expect, it, beforeAll, afterAll} from '@jest/globals';
import express from 'express';

describe('API Test', () => {
    const app = express()
    let server;
    let baseUrl;

    beforeAll(async () => {
        const router = (await import('../api/api.js')).default
        server = app.use('/api', router).listen(0)

        await new Promise(resolve => server.once('listening', resolve));

        const address = server.address();
        baseUrl = `http://127.0.0.1:${address.port}`;
    })

    afterAll(async () => {
        await server.close()
    })

    it('responds to health check route', async () => {
        const address = server.address()

        if (!address) {
            throw new Error('Test server did not bind to a port')
        }

        const resp = await fetch(`${baseUrl}/api/status`)

        expect(resp.status).toBe(200)
    })
})