const insert = require('../helpers/insert');
const hash = require('../helpers/hash');

module.exports = redisClient => [{
  method: 'POST',
  path: '/minify',
  handler: (request, response) => {
    const { longUrl } = request.payload;
    insert(longUrl, hash(longUrl)).then((result) => {
      redisClient.hset('urls', result.shortUrl, result.longUrl);
      response(result).code(201);
    }).catch(() => {
      response('There was an error').code(500);
    });
  },
}];
