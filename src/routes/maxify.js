const { url } = require('../../models');

module.exports = redisClient => [
  { // FIND
    method: 'GET',
    path: '/maxify/{shortUrl}',
    handler: (request, reply) => {
      const { shortUrl } = request.params;
      redisClient.hget('urls', shortUrl, (err, redisReply) => {
        if (redisReply !== null) { return reply(redisReply); }
        url.findOne({
          where: { shortUrl },
        }).then((urlEntry) => {
          if (urlEntry !== null) {
            const { longUrl } = urlEntry;
            redisClient.hset('urls', shortUrl, longUrl);
            reply({ longUrl });
          } else {
            reply('Invalid input url').code(404);
          }
        });
      });
    },
  },
];
