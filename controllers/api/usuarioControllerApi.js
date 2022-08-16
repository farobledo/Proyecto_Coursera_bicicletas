var Usuario = require('../../models/usuario');

exports.usurio_list = function (req, res) {
    Usuario.find({}, function (err, usuarios) {
        res.status(200).json({
            usuarios: usuarios
        });
    });
};

exports.usurio_create = function (req, res) {
    var usuario = new Usuario({
        nombre: req.body.nombre
    });
    usuario.save();
    res.status(200).json({
        usuario: usuario
    });
};

exports.usurio_reservar = function (req, res) {
    Usuario.findById(req.body.id, function (err, usuario) {
        usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta, function (err, reserva) {
            res.status(200).send({
                reserva: reserva
            });
        });
    });
};