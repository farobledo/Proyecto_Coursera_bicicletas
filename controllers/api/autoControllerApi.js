const Usuario = require('../../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuario = require('../../models/usuario');

module.exports = {
    authenticate: function (req, res, next) {
        Usuario.findOne({
            email: req.body.email
        }, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                if (userInfo === null) {
                    return res.status(401).json({
                        status: "error",
                        mensagge: "Invalid email/password!",
                        data: null
                    });
                }
                if (userInfo != null && bcrypt.compareSyn(req.body.password, userInfo.password)) {
                    const token = jwt.sign({
                        id: userInfo_id
                    }, req.app.get('secretKey'), {
                        expiresIn: '7h'
                    });
                    res.status(200).json({
                        mensagge: "usuario encontrado!",
                        data: {
                            usuario: userInfo,
                            token: token
                        }
                    });
                } else {
                    res.status(401).json({
                        status: "error",
                        mensagge: "No Existe el usuario",
                        data: null
                    });
                }
            }
        });
    },
    forgePassword: function (req, res, next) {
        Usuarios.findOne({
            email: req.body.email
        }, function (err, usuarios) {
            if (!usuario) return res.status(401).json({
                mensagge: "No Existe el usuario",
                data: null
            });
            usuario.resetPassword(function (err) {
                if (err) {
                    return next(err)
                }
                res.status(200).json({
                    mensagge: "Se ha enviado un email para restablecer el password",
                    data: null
                });
            });
        });
    }
};