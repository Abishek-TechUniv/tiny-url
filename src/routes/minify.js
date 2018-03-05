const { url } = require('../../models');
const md5 = require('md5');

const minify = (longUrl, start) => md5(longUrl).slice(start, start + 6);


const routes = [
  { // CREATE
    method: 'POST',
    path: '/minify',
    handler: (request, reply) => {
      const { longUrl } = request.payload;
      url.findOrCreate({
        where: { longUrl, shortUrl: minify(longUrl, 0) },
        defaults: { shortUrl: minify(longUrl, 0), longUrl },
      }).then(([result, completed]) => {
        if (completed) {
          return url.create({
            shortUrl: minify(longUrl, 6),
            longUrl,
          });
        }
        return result;
      })
        .then(result => reply(result.shortUrl).code(201));
    },
  },
];

module.exports = routes;
