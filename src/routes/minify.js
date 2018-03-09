const insert = require('../helpers/insert');
const hash = require('../helpers/hash');

module.exports = redisClient => [{
  method: 'POST',
  path: '/minify',
  handler: (request, reply) => {
    const { longUrl } = request.payload;
    insert(longUrl, hash(longUrl)).then((result) => {
      const { shortUrl, created } = result;
      if (created) {
        redisClient.hset('urls', shortUrl, longUrl);
      }
      reply({ shortUrl }).code(201);
    }).catch(() => {
      reply('There was an error').code(500);
    });
  },
}];
