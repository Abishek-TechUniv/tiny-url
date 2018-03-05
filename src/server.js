const Hapi = require('hapi');
const Routes = require('./routes');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: (Number(process.argv[2]) || 7070),
});

server.route(Routes);

if (!module.parent) server.start();

module.exports = server;
