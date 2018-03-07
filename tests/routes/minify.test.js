const server = require('../../src/server');

describe('Testing the minify route', () => {
  test('The route should reply with 201 for PUT request', (done) => {
    const options = {
      method: 'POST',
      url: '/minify',
      payload: {
        longUrl: 'http://abcdefghi.com',
      },
    };

    server.inject(options, (result) => {
      expect(result.statusCode).toBe(201);
      done();
    });
  });

  test('The route should reply with a string for PUT request', (done) => {
    const options = {
      method: 'POST',
      url: '/minify',
      payload: {
        longUrl: 'http://abcdefghi.com',
      },
    };

    server.inject(options, (result) => {
      expect(typeof result.result).toBe(typeof '');
      done();
    });
  });

  test('The route should reply with a string of length 6 for PUT request', (done) => {
    const options = {
      method: 'POST',
      url: '/minify',
      payload: {
        longUrl: 'http://abcdefghi.com',
      },
    };

    server.inject(options, (result) => {
      expect(result.result.length).toBe(6);
      done();
    });
  });
});
