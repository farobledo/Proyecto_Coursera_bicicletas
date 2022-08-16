var mongoose = require
var Reserva = require('../../models/reserva');
var Usuario = require('../../models/usuario');

describe('Testing Usuarios', function () {
    var mongoDB = 'mongodb://localhost/testdb';
    mongoose.connect(mongoDB, {
        useNewUrlParser: true
    });

    const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
    db.on('open', function () {
        console.log('We are connected to test database!');

        done();
    });
});

afterEach(function (done) {
    Reserva.deleteMany({}, function (err, success) {
        if (err) console.log(err);
        Usuario.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            Bicicleta.deleteMany({}, function (err, success) {
                if (err) console.log(err);
                done();
            });
        });
    });
});

describe('Cuando un Usuario reserva una bici', () => {
    it('debe existir la reserva', (done) => {
        const usuario = new Usuario({
            nombre: 'Juan'
        });
        usuario.save();
        const bicicleta = new Bicicleta({
            code: 1,
            color: "rojo",
            modelo: "urbana"
        });
        bicicleta.save();

        var hoy = new Date();
        var mañana = new Date();
        mañana.setDate(hoy.getDate() + 1);
        usuario.reservar(bicicleta.id, new Date(), new Date(), function (err, reserva) {
            Reserva.find({}).populate('bicicleta').populate('usuario').exec(function (err, reservas) {
                expect(reservas.length).toBe(1);
                expect(reservas[0].diasDeReserva()).toBe(2);
                expect(reservas[0].bicicleta.code).toBe(1);
                expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                done();
            });
        });
    });
});

