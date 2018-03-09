const maxify = require('./maxify');
const minify = require('./minify');

module.exports = redisClient => [{
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    redisClient.hgetall('users', (err, result) => reply(result));
  },
}].concat(
  maxify(redisClient),
  minify(redisClient),
);
