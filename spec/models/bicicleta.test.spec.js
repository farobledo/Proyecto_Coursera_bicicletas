var Bicicleta = require('../../models/bicicleta');
var mongoose = require('mongoose');

describe('Testing Bicicletas', () => {
    beforeAll(function (done) {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, {
            useNewUrlParser: true
        });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('We are connected to test database!');
            done();
        });
    });

    afterEach(function (done) {
        Bicicleta.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            done();
        });
    });

    describe('Bicicleta.createInstance', () => {
        it('crea una instancia de Bicicleta', () => {
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(-34.5);
            expect(bici.ubicacion[1]).toEqual(-54.1);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('comienza vacia', (done) => {
            Bicicleta.allBicis(function (err, bicis) {
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('agregamos una bicicleta', (done) => {
            var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
            Bicicleta.add(a, function (err, newBici) {
                if (err) console.log(err);
                Bicicleta.allBicis(function (err, bicis) {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('debe devolver la bici con code 1', (done) => {
            Bicicleta.allBicis(function (err, bicis) {
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
                Bicicleta.add(aBici, function (err, newBici) {
                    if (err) console.log(err);
                    var aBici2 = new Bicicleta({ code: 2, color: "rojo", modelo: "urbana" });
                    Bicicleta.add(aBici2, function (err, newBici) {
                        if (err) console.log(err);
                        Bicicleta.findByCode(1, function (error, targetBici) {
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);
                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Bicicleta.removeByCode', () => {
        it('debe eliminar la bici con code 1', (done) => {
            Bicicleta.allBicis(function (err, bicis) {
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
                Bicicleta.add(aBici, function (err, newBici) {
                    if (err) console.log(err);
                    var aBici2 = new Bicicleta({ code: 2, color: "rojo", modelo: "urbana" });
                    Bicicleta.add(aBici2, function (err, newBici) {
                        if (err) console.log(err);
                        Bicicleta.removeByCode(1, function (error, targetBici) {
                            Bicicleta.allBicis(function (err, bicis) {
                                expect(bicis.length).toBe(1);
                                expect(bicis[0].code).toBe(2);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

});








// beforeEach(() => {Bicicleta.allBicis = []});

// describe('Bicicleta.allBicis', () => {
//     it('comienza vacia', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//     });
// });

// describe('Bicicleta.add', () => {
//     it('agrega una bicicleta', () => {
//         var a = new Bicicleta(1, "rojo", "urbana");
//         Bicicleta.add(a);
//         expect(Bicicleta.allBicis.length).toBe(1);
//         expect(Bicicleta.allBicis[0]).toBe(a);
//     });
// });

// describe ('Bicicleta.findById', () => {
//     it('busca una bicicleta por id 1', () => {
//        expect(Bicicleta.allBicis.length).toBe(0);
//          var aBici = new Bicicleta(1, "rojo", "urbana");
//          var bBici = new Bicicleta(2, "azul", "urbana");

//             Bicicleta.add(aBici);
//             Bicicleta.add(bBici);

//             var targetBici = Bicicleta.findById(1);
//             expect(targetBici).toBe(1);
//             expect(targetBici.color).toBe(aBici.color);
//             expect(targetBici.model).toBe(aBici.model);

//     });
// });

// expect('Bicicleta.removeById', () => {
//     it('remueve una bicicleta por id 1', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//         var aBici = new Bicicleta(1, "rojo", "urbana");
//         var bBici = new Bicicleta(2, "azul", "urbana");

//         Bicicleta.add(aBici);
//         Bicicleta.add(bBici);

//         Bicicleta.removeById(1);
//         expect(Bicicleta.allBicis.length).toBe(1);
//         expect(Bicicleta.allBicis[0]).toBe(bBici);
//     });
// });