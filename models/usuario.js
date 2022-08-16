var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Reserva = require('./reserva');

var usuarioSchema = new Schema({
    nombre: String,

});

usuarioSchema.method.reservar = function (biciId, desde , hasta, cb) {
    var reserva = new Reserva({ usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta });
    console.log("reserva");
    reserva.save(cb);

    };

    module.exports = mongoose.model("Usuario", usuarioSchema);

