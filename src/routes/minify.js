const insert = require('../helpers/insert');
const hash = require('../helpers/hash');

module.exports = [{
  method: 'PUT',
  path: '/url',
  handler: (request, response) => {
    const { longUrl } = request.payload;
    insert(longUrl, hash(longUrl)).then((result) => {
      response(result).code(201);
    }).catch(() => {
      response('There was an error').code(500);
    });
  },
}];
