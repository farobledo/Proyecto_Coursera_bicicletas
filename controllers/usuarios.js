var Usuario = require('../models/usuario');

module.exports = {
    list: function (req, res) {
        Usuario.find({}, function (err, usuarios) {
           res.render('usuarios/index', {usuarios: usuarios});
        });
    },

    update_get: function (req, res) {
        Usuario.findById(req.params.id, function (err, usuario) {
            res.render('usuarios/update', {usuario: usuario});
        });
    },
    update: function (req, res) {
        var update_values = {nombre: req.body.nombre,};
        Usuario.findByIdAndUpdate(req.params.id, update_values, function (err, usuario) {
            if (err) {
                res.render('usuarios/update', {error: err.error, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email})}); 
            } else {
                res.redirect('/usuarios');
                return

            }
        });
    },

    create_get: function (req, res) {
        res.render('usuarios/create, {error: err.error, usuario: new Usuario()});
    },
    create: function (req, res, next) {
        if (req.body.password != req.body.confirm_password) {
            res.render('usuarios/create', {error: 'Las contraseñas no coinciden', usuario: new Usuario(req.body)});
            return;
        }

        Usuario.create({nombre: req.body.nombre, email: req.body.email, password: req.body.password }, function (err, nuevoUsuario) {
            if (err) {
                res.render('usuarios/create', {error: err.error, usuario: new Usuario(req.body)});
            } else {
                nuevoUsuario.enviar_email_bienvenida();
                res.redirect('/usuarios');
            }
        });
    },
    delete: function (req, res, next) {
        Usuario.findByIdAndDelete(req.params.id, function (err) {
            if (err) {
               next(err);
            } else {
                res.redirect('/usuarios');
            });
        },

    }

        