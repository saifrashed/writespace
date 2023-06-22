const { auth } = require('../middleware/auth');
const httpMocks = require('node-mocks-http');
const axios = require('axios');


// Overwritess the axios module with a mock version of axios that always returns the same value
// This is done to avoid making a real HTTP request to the auth service with canvas api
jest.mock('axios');
jest.mock('crypto-js', () => ({
    AES: {
        decrypt: jest.fn((token) => token),
        encrypt: jest.fn((token) => token),
    },
    enc: {
        Utf8: {
            toString: jest.fn(),
        },
    },
}));

describe('auth middleware', () => {
    it('should call next if the token is valid', async () => {
        const req = httpMocks.createRequest({
            headers: {
                bearer: 'valid-token',
            },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        axios.get.mockResolvedValue({
            data: {
                id: 'valid-user-id',
            },
        });

        await auth(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.locals.userId).toBe('valid-user-id');
        expect(req.headers.bearer).toBe('valid-token');
    });

    it('should send a 401 response if the token is invalid', async () => {
        const req = httpMocks.createRequest({
            headers: {
                bearer: 'invalid-token',
            },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        axios.get.mockRejectedValue(new Error('Invalid token'));

        await auth(req, res, next);

        expect(res.statusCode).toBe(401);
        expect(res._getData()).toBe('Error: Authorization failed.');
        expect(next).not.toHaveBeenCalled();
    });
});
