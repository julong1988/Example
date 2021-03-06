const restify = require('restify')

const server = restify.createServer({
    name: 'restful api',
    version: '1.0.0'
  });

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;
