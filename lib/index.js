var Hapi = require('hapi');

module.exports.startServer = function(type, routes) {

    var server = new Hapi.Server();
    server.connection();
    for (var i = 0; i < routes.length; i++) {
       var file = __dirname + '/fixtures/server/' + type + routes[i].path + '/' + routes[i].file;
       console.log(file);
       server.route({
           method: routes[i].method,
           path: routes[i].path,
           handler: {
               file: file
           }
       });
    }
    console.log(__dirname);
    return server;
};

module.exports.stopServer = function(server) {

    server.stop();
};
