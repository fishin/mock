var Hapi = require('hapi');

module.exports.startMock = function(routes) {

    var server = new Hapi.Server();
    server.connection();
    for (var i = 0; i < routes.length; i++) {
       server.route({
           method: routes[i].method,
           path: routes[i].path,
           handler: {
               file: './fixtures/' + routes[i].file
           }
       });
    }
    return server;
};

module.exports.stopMock = function(server) {

    server.stop();
};
