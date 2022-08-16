"use strict";

var Bicicleta = require('../../models/bicicleta');

var request = require('request');

describe('Bicicleta API', function () {
  describe('GET BICICLETAS /', function () {
    it('Status 200', function () {
      expect(Bicicleta.allBicis.length).toBe(0);
      var aBici = new Bicicleta(1, "rojo", "urbana");
      Bicicleta.add(a);
      request.get('http://localhost:3000/api/bicicletas', function (error, response, body) {
        expect(response.statusCode).toBe(200);
      });
    });
  });
});