const server = require('../src/server');

describe('Testing the server', () => {
  test('The server should return with a "Server running" on the default path', (done) => {
    server.inject('/', (result) => {
      expect(result.statusCode).toBe(200);
      done();
    });
  });
});
