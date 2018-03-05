const { url } = require('../../models');

const routes = [
  { // FIND
    method: 'GET',
    path: '/maxify/{shortUrl}',
    handler: (request, reply) => {
      const { shortUrl } = request.params;
      url.findOne({
        where: { shortUrl },
      }).then(result => reply(result.longUrl).code(201));
    },
  },
];

module.exports = routes;
