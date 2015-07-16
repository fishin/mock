var Code = require('code');
var Lab = require('lab');

var Mock = require('../lib');

var internals = {};

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.describe;
var it = lab.it;


describe('mock', function () {

    it('add route', function (done) {

        var routes = [
           {
              method: 'get',
              path: '/repos/org/repo/pulls',
              file: 'index.json'

           }
        ];
        Mock.prepareServer('github', routes, function (server) {

            server.start(function () {

                var getRoutes = server.connections[0]._router.routes.get.routes;
                expect(getRoutes.length).to.equal(1);
                //console.log(getRoutes);
                var route = getRoutes[0].route;
                expect(route.path).to.equal('/repos/org/repo/pulls');
                expect(route.method).to.equal('get');
                var url = server.info.uri + '/repos/org/repo/pulls';
                server.inject({ method: 'get', url: url }, function (response) {

                    //console.log(response.result);
                    expect(response.result).to.exist();
                    expect(response.statusCode).to.equal(200);
                    server.stop();
                    done();
                });
            });
        });
    });

    it('add route notfound', function (done) {

        var routes = [
           {
              method: 'get',
              path: '/repos/org/repo/pulls',
              file: 'notfound.json'

           }
        ];
        Mock.prepareServer('github', routes, function (server) {

            server.start(function () {

                var getRoutes = server.connections[0]._router.routes.get.routes;
                expect(getRoutes.length).to.equal(1);
                //console.log(getRoutes);
                var route = getRoutes[0].route;
                expect(route.path).to.equal('/repos/org/repo/pulls');
                expect(route.method).to.equal('get');
                var url = server.info.uri + '/repos/org/repo/pulls';
                server.inject({ method: 'get', url: url }, function (response) {

                    //console.log(response.result);
                    expect(response.result).to.exist();
                    expect(response.statusCode).to.equal(200);
                    server.stop();
                    done();
                });
            });
        });
    });

    it('add route error.txt', function (done) {

        var routes = [
           {
              method: 'get',
              path: '/repos/org/repo/pulls',
              file: 'error.txt'

           }
        ];
        Mock.prepareServer('github', routes, function (server) {

            server.start(function () {

                var getRoutes = server.connections[0]._router.routes.get.routes;
                expect(getRoutes.length).to.equal(1);
                //console.log(getRoutes);
                var route = getRoutes[0].route;
                expect(route.path).to.equal('/repos/org/repo/pulls');
                expect(route.method).to.equal('get');
                var url = server.info.uri + '/repos/org/repo/pulls';
                server.inject({ method: 'get', url: url }, function (response) {

                    //console.log(response.result);
                    expect(response.result.trim()).to.equal('error');
                    expect(response.statusCode).to.equal(200);
                    server.stop();
                    done();
                });
            });
        });
    });

    it('add route empty.txt', function (done) {

        var routes = [
           {
              method: 'get',
              path: '/empty',
              file: 'empty.txt'

           }
        ];
        Mock.prepareServer('tacklebox', routes, function (server) {

            server.start(function () {

                var url = server.info.uri + '/empty';
                server.inject({ method: 'get', url: url }, function (response) {

                    expect(response.statusCode).to.equal(200);
                    expect(response.result).to.equal('');
                    server.stop();
                    done();
                });
            });
        });
    });


    it('add route true', function (done) {

        var routes = [
           {
              method: 'get',
              path: '/api/user/1/validate',
              file: 'true'

           }
        ];
        Mock.prepareServer('tacklebox', routes, function (server) {

            server.start(function () {

                var url = server.info.uri + '/api/user/1/validate';
                server.inject({ method: 'get', url: url }, function (response) {

                    //console.log(response.result);
                    expect(response.result).to.be.true();
                    server.stop();
                    done();
                });
            });
        });
    });

    it('add route false', function (done) {

        var routes = [
           {
              method: 'get',
              path: '/api/user/1/validate',
              file: 'false'

           }
        ];
        Mock.prepareServer('tacklebox', routes, function (server) {

            server.start(function () {

                var url = server.info.uri + '/api/user/1/validate';
                server.inject({ method: 'get', url: url }, function (response) {

                    //console.log(response.result);
                    expect(response.result).to.be.false();
                    server.stop();
                    done();
                });
            });
        });
    });

    it('add route null', function (done) {

        var routes = [
           {
              method: 'get',
              path: '/api/user/byname/admin',
              file: 'null'

           }
        ];
        Mock.prepareServer('tacklebox', routes, function (server) {

            server.start(function () {

                var url = server.info.uri + '/api/user/byname/admin';
                server.inject({ method: 'get', url: url }, function (response) {

                    //console.log(response.result);
                    expect(response.result).to.not.exist();
                    server.stop();
                    done();
                });
            });
        });
    });


    it('add function nocb', function (done) {

        var functions = [
           {
              name: 'runCommand',
              file: 'succeeded.json'
           }
        ];
        var library = Mock.prepareLibrary('smelt', functions);
        var result = library.runCommand();
        //console.log(result);
        expect(result.command).to.equal('command');
        expect(result.status).to.equal('succeeded');
        done();
    });

    it('add function cb', function (done) {

        var functions = [
           {
              name: 'runCommand',
              file: 'succeeded.json'
           }
        ];
        Mock.prepareLibrary('smelt', functions, function (library) {

            var result = library.runCommand();
            //console.log(result);
            expect(result.command).to.equal('command');
            expect(result.status).to.equal('succeeded');
            done();
        });
    });
});
