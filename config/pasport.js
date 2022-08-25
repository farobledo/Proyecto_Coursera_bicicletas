const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');

passport.use(new LocalStrategy(
    function (email, password, done) {
        Usuario.findOne({
            email: email
        }, function (err, usuario) {
            if (err) {
                return done(err);
            }
            if (!usuario) return done(null, false, {
                message: 'El usuario no existe'
            });
            if (!usuario.validarPassword(password)) return done(null, false, {
                message: 'La contraseña es incorrecta'
            });
            return done(null, usuario);
        });
    }
));


passport.serializeUser(function (usuario, done) {
    done(null, usuario.id);
});




passport.deserializeUser = function (id, callback) {
    Usuario.findById(id, function (err, usuario) {
        if (err) {
            return callback(err);
        }
        callback(null, usuario);
    });

};

module.exports = passport;