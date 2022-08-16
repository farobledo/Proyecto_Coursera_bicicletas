var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

describe('Bicicleta API', () => {
    describe('GET BICICLETAS /', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var aBici = new Bicicleta(1, "rojo", "urbana");
            Bicicleta.add(a);
            request.get('http://localhost:3000/api/bicicletas', function (error, response, body) {
                expect(response.statusCode).toBe(200);

            });
        });
    });
});


describe("POST BICICLETAS /create", () => {
    it('STATUS 200', (done) => {
        var headers = { 'content-type': 'application/json' };
        var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": -34.6012424, "lng": -58.3861497 }';
        request.post({
            headers: headers,
            url: 'http://localhost:3000/api/bicicletas/create',
            body: aBici
        }, function (error, response, body) {
            expect(response.statusCode).toBe(200);
            expect(Bicicleta.findById(10).color).toBe("rojo");
            done();
        });
    });
});

describe("DELETE BICICLETAS /delete", () => {
    it('STATUS 204', (done) => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1, "rojo", "urbana");
        Bicicleta.add(a);

        var headers = { 'content-type': 'application/json' };
        request.delete({
            headers: headers,
            url: 'http://localhost:3000/api/bicicletas/delete',
            body: '{"id": 1}'
        }, function (error, response, body) {
            expect(response.statusCode).toBe(204);
            expect(Bicicleta.findById(1)).toBeUndefined();
            done();
        });
    });
});

describe("PUT BICICLETAS /update", () => {
    it('STATUS 200', (done) => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1, "rojo", "urbana");
        Bicicleta.add(a);

        var headers = { 'content-type': 'application/json' };
        var aBici = '{ "id": 1, "color": "verde", "modelo": "urbana", "lat": -34.6012424, "lng": -58.3861497 }';
        request.put({
            headers: headers,
            url: 'http://localhost:3000/api/bicicletas/update',
            body: aBici
        }, function (error, response, body) {
            expect(response.statusCode).toBe(200);
            expect(Bicicleta.findById(1).color).toBe("verde");
            done();
        });
    });
});




