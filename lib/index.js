'use strict';

const Fs = require('fs');
const Hapi = require('hapi');
const Hoek = require('hoek');
const Inert = require('inert');
const Path = require('path');

const internals = {};

internals.generateFunction = function (filename) {

    return function () {

        return JSON.parse(Fs.readFileSync(filename, 'utf8'));
    };
};

internals.generateHandler = function (value) {

    return function (request, reply) {

        return reply(value);
    };
};



module.exports.prepareServer = function (type, routes, cb) {

    const server = new Hapi.Server();
    server.connection();
    server.register(Inert, Hoek.ignore);
    for (let i = 0; i < routes.length; ++i) {
        let file = Path.join(__dirname, 'fixtures', 'server', type + routes[i].path, routes[i].file);
        if (routes[i].file === 'notfound.json' || routes[i].file === 'error.txt' || routes[i].file === 'empty.txt') {
            file = Path.join(__dirname, 'fixtures', 'server', type, 'common', routes[i].file);
        }
        if (routes[i].file === 'true') {
            server.route({
                method: routes[i].method,
                path: routes[i].path,
                handler: internals.generateHandler(true)
            });
        }
        else if (routes[i].file === 'false') {
            server.route({
                method: routes[i].method,
                path: routes[i].path,
                handler: internals.generateHandler(false)
            });
        }
        else if (routes[i].file === 'null') {
            server.route({
                method: routes[i].method,
                path: routes[i].path,
                handler: internals.generateHandler(null)
            });
        }
        else {
            server.route({
                method: routes[i].method,
                path: routes[i].path,
                handler: {
                    file: file
                }
            });
        }
        //console.log(file);
    }
    //console.log(__dirname);
    return cb(server);
};

module.exports.prepareLibrary = function (libraryName, functions, cb) {

    const library = {};
    for (let i = 0; i < functions.length; ++i) {
        const file = Path.join(__dirname, 'fixtures', 'library', libraryName, functions[i].name, functions[i].file);
        library[functions[i].name] = internals.generateFunction(file);
    }
    if (cb) {
        return cb(library);
    }
    return library;
};
