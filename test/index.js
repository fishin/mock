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
        var server = Mock.startServer('github', routes);
        var getRoutes = server.connections[0]._router.routes.get.routes;
        expect(getRoutes.length).to.equal(1);
        //console.log(getRoutes);
        var route = getRoutes[0].route;
        expect(route.path).to.equal('/repos/org/repo/pulls');
        expect(route.method).to.equal('get');
        var options = {
            headers:   {
                'User-Agent': 'ficion'
            }
        };
        var url = server.info.uri + '/repos/org/repo/pulls';
        server.inject({ method: 'GET', url: url}, function (response) {
      
            console.log(response.result); 
            expect(response.statusCode).to.equal(200);
            Mock.stopServer(server);
            done();
        });
    });
});
