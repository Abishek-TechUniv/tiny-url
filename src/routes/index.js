const maxify = require('./maxify');
const minify = require('./minify');

module.exports = [{
  path: '/',
  method: 'GET',
  handler: (request, response) => {
    response('pong');
  },
}].concat(maxify, minify);
