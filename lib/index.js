var Hapi = require('hapi');

module.exports.prepareServer = function(type, routes, cb) {

    var server = new Hapi.Server();
    server.connection();
    for (var i = 0; i < routes.length; i++) {
       var file = __dirname + '/fixtures/server/' + type + routes[i].path + '/' + routes[i].file;
       if (routes[i].file === 'notfound.json' || routes[i].file === 'error.txt') {
          file = __dirname + '/fixtures/server/' + type + '/common/' + routes[i].file;
       }
//       console.log(file);
       server.route({
           method: routes[i].method,
           path: routes[i].path,
           handler: {
               file: file
           }
       });
    }
    //console.log(__dirname);
    return cb(server);
};
