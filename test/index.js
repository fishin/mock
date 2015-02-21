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
              path: '/path',
              file: 'blah.json'

           }
        ];
        var server = Mock.startMock(routes);
        var getRoutes = server.connections[0]._router.routes.get.routes;
        expect(getRoutes.length).to.equal(1);
        //console.log(getRoutes);
        var route = getRoutes[0].route;
        expect(route.path).to.equal('/path');
        expect(route.method).to.equal('get');
        Mock.stopMock(server);
        done();
    });
});
