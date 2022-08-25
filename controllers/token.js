var Usuario = require('../models/usuario');
var Token = require('../models/token');

module.exports = {
    confirmationGet: function (req, res) {
        Token.findOne({ token: req.params.token }, function (err, token) {
            if (!token) return res.status(400).send({ type: 'not-verified', msg: 'El token no existe.' });
            Usuario.findById(token._userId, function (err, usuario) {
                if (!usuario) return res.status(400).send({ msg: 'El usuario no existe.' });
                if (usuario.verificado) return redirect('/usuario');
                usuario.verificado = true;
                usuario.save(function (err) {
                    if (err) return res.status(500).send({ msg: err.message });
                    return res.redirect('/');
                });
            });
        });
    }
};