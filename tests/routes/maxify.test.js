const server = require('../../src/server');
const { url } = require('../../models');
const Redis = require('redis');

const redisClient = Redis.createClient();

describe('Testing the Hapi server that returns tiny url on passing long url', () => {
  beforeEach((done) => {
    url.create({
      longUrl: 'http://testy-test.com',
      shortUrl: 'abcsss',
    }).then(() => {
      done();
    });
  });
  afterEach((done) => {
    url.destroy({
      truncate: true,
    }).then(() => {
      redisClient.hdel('urls', 'abcsss');
      done();
    });
  });
  test('Should return a long url for an existing entry in the database', (done) => {
    const request = {
      method: 'GET',
      url: '/maxify/abcsss',
    };
    server.inject(request, (response) => {
      expect(response.result.longUrl).toBe('http://testy-test.com');
      done();
    });
  });
  test('Should return an error for non existing url', (done) => {
    const request = {
      method: 'GET',
      url: '/maxify/000000',
    };
    server.inject(request, (response) => {
      expect(response.result).toBe('Invalid input url');
      done();
    });
  });
  test('Should return an error for an invalid url', (done) => {
    const request = {
      method: 'GET',
      url: '/maxify/0000',
    };
    server.inject(request, (response) => {
      expect(response.result).toBe('Invalid input url');
      done();
    });
  });
});
