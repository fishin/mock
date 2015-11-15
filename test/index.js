'use strict';

const Code = require('code');
const Hoek = require('hoek');
const Lab = require('lab');

const Mock = require('../lib');

const internals = {};

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;


describe('mock', () => {

    it('add route', (done) => {

        const routes = [
            {
                method: 'get',
                path: '/repos/org/repo/pulls',
                file: 'index.json'
            }
        ];
        Mock.prepareServer('github', routes, (server) => {

            server.start(() => {

                const getRoutes = server.connections[0]._router.routes.get.routes;
                expect(getRoutes.length).to.equal(1);
                //console.log(getRoutes);
                const route = getRoutes[0].route;
                expect(route.path).to.equal('/repos/org/repo/pulls');
                expect(route.method).to.equal('get');
                const url = server.info.uri + '/repos/org/repo/pulls';
                server.inject({ method: 'get', url: url }, (response) => {

                    //console.log(response.result);
                    expect(response.result).to.exist();
                    expect(response.statusCode).to.equal(200);
                    server.stop(Hoek.ignore);
                    done();
                });
            });
        });
    });

    it('add route notfound', (done) => {

        const routes = [
            {
                method: 'get',
                path: '/repos/org/repo/pulls',
                file: 'notfound.json'
            }
        ];
        Mock.prepareServer('github', routes, (server) => {

            server.start(() => {

                const getRoutes = server.connections[0]._router.routes.get.routes;
                expect(getRoutes.length).to.equal(1);
                //console.log(getRoutes);
                const route = getRoutes[0].route;
                expect(route.path).to.equal('/repos/org/repo/pulls');
                expect(route.method).to.equal('get');
                const url = server.info.uri + '/repos/org/repo/pulls';
                server.inject({ method: 'get', url: url }, (response) => {

                    //console.log(response.result);
                    expect(response.result).to.exist();
                    expect(response.statusCode).to.equal(200);
                    server.stop(Hoek.ignore);
                    done();
                });
            });
        });
    });

    it('add route error.txt', (done) => {

        const routes = [
            {
                method: 'get',
                path: '/repos/org/repo/pulls',
                file: 'error.txt'
            }
        ];
        Mock.prepareServer('github', routes, (server) => {

            server.start(() => {

                const getRoutes = server.connections[0]._router.routes.get.routes;
                expect(getRoutes.length).to.equal(1);
                //console.log(getRoutes);
                const route = getRoutes[0].route;
                expect(route.path).to.equal('/repos/org/repo/pulls');
                expect(route.method).to.equal('get');
                const url = server.info.uri + '/repos/org/repo/pulls';
                server.inject({ method: 'get', url: url }, (response) => {

                    //console.log(response.result);
                    expect(response.result.trim()).to.equal('error');
                    expect(response.statusCode).to.equal(200);
                    server.stop(Hoek.ignore);
                    done();
                });
            });
        });
    });

    it('add route empty.txt', (done) => {

        const routes = [
            {
                method: 'get',
                path: '/empty',
                file: 'empty.txt'
            }
        ];
        Mock.prepareServer('tacklebox', routes, (server) => {

            server.start(() => {

                const url = server.info.uri + '/empty';
                server.inject({ method: 'get', url: url }, (response) => {

                    expect(response.statusCode).to.equal(200);
                    expect(response.result).to.equal('');
                    server.stop(Hoek.ignore);
                    done();
                });
            });
        });
    });


    it('add route true', (done) => {

        const routes = [
            {
                method: 'get',
                path: '/api/user/1/validate',
                file: 'true'
            }
        ];
        Mock.prepareServer('tacklebox', routes, (server) => {

            server.start(() => {

                const url = server.info.uri + '/api/user/1/validate';
                server.inject({ method: 'get', url: url }, (response) => {

                    //console.log(response.result);
                    expect(response.result).to.be.true();
                    server.stop(Hoek.ignore);
                    done();
                });
            });
        });
    });

    it('add route false', (done) => {

        const routes = [
            {
                method: 'get',
                path: '/api/user/1/validate',
                file: 'false'
            }
        ];
        Mock.prepareServer('tacklebox', routes, (server) => {

            server.start(() => {

                const url = server.info.uri + '/api/user/1/validate';
                server.inject({ method: 'get', url: url }, (response) => {

                    //console.log(response.result);
                    expect(response.result).to.be.false();
                    server.stop(Hoek.ignore);
                    done();
                });
            });
        });
    });

    it('add route null', (done) => {

        const routes = [
            {
                method: 'get',
                path: '/api/user/byname/admin',
                file: 'null'
            }
        ];
        Mock.prepareServer('tacklebox', routes, (server) => {

            server.start(() => {

                const url = server.info.uri + '/api/user/byname/admin';
                server.inject({ method: 'get', url: url }, (response) => {

                    //console.log(response.result);
                    expect(response.result).to.not.exist();
                    server.stop(Hoek.ignore);
                    done();
                });
            });
        });
    });


    it('add function nocb', (done) => {

        const functions = [
            {
                name: 'runCommand',
                file: 'succeeded.json'
            }
        ];
        const library = Mock.prepareLibrary('smelt', functions);
        const result = library.runCommand();
        //console.log(result);
        expect(result.command).to.equal('command');
        expect(result.status).to.equal('succeeded');
        done();
    });

    it('add function cb', (done) => {

        const functions = [
            {
                name: 'runCommand',
                file: 'succeeded.json'
            }
        ];
        Mock.prepareLibrary('smelt', functions, (library) => {

            const result = library.runCommand();
            //console.log(result);
            expect(result.command).to.equal('command');
            expect(result.status).to.equal('succeeded');
            done();
        });
    });
});
