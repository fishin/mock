var Fs = require('fs');
var Hapi = require('hapi');
var Path = require('path');

module.exports.prepareServer = function (type, routes, cb) {

    var server = new Hapi.Server();
    server.connection();
    for (var i = 0; i < routes.length; i++) {
        var file = Path.join(__dirname, 'fixtures', 'server', type + routes[i].path, routes[i].file);
        if (routes[i].file === 'notfound.json' || routes[i].file === 'error.txt') {
            file = Path.join(__dirname, 'fixtures', 'server', type, 'common', routes[i].file);
        }
        //console.log(file);
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

module.exports.prepareLibrary = function (libraryName, functions, cb) {

    var library = {};
    for (var i = 0; i < functions.length; i++) {
        var file = Path.join(__dirname, 'fixtures', 'library', libraryName, functions[i].name, functions[i].file);
        library[functions[i].name] = function () {

            return JSON.parse(Fs.readFileSync(file, 'utf8'));
        };
    }
    if (cb) {
        return cb(library);
    }
    return library;
};
