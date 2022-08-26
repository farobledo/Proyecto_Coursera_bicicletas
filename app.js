require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('./config/passport');
var session = require('express-session');
var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletasRouter = require('./routes/bicicletas');
var bicicletasAPIRouter = require('./routes/api/bicicletas');
var usuarioAPIRouter = require('./routes/api/usuarios');

const Usuarios = require('./models/usuarios');
const Token = require('./models/token');

const store = new session.MemoryStore;

var app = express();

app.use(session({
  cookie: {
    maxAge: 240 * 60 * 60 * 1000
  },
  store: store,
  saveUninitialized: true,
  resave: true,
  secret: 'red_bicis_!!!***!".!".!".!".!.123123'
}));

var mongoose = require('mongoose');
const {
  cookie
} = require('request');
const usuario = require('./models/usuario');
const {
  error
} = require('console');

var mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('We are connected to test!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', function (req, res) {
  res.render('session/login');
});

app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!usuario) return res.render('session/login', {
      info
    });
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

app.get('/logout', function (req, res) {
  res.logout();
  res.redirect('/');
});

app.get('/forgoPassword', function (req, res) {
  res.render('session/forgoPasswordMessage');
});


app.post('/forgotPassword', function (req, res) {
  Usuario.findOne({
    email: req.body.email
  }, function (err, usuario) {
    if (!usuario) return res.render('forgotPassword', {
      info: {
        message: 'No existe el email para un usuario existente.'
      }
    });

    usuario.resetPassword(function (err) {
      if (err) return next(err);
      console.log('forgotPasswordMessage');
    });

    res.render('session/forgotPasswordMessage');
  });
});

app.get('/resetPassword/:token', function (req, res, next) {
  Token.findOne({
    token: req.params.token
  }, function (err, token) {
    if (!token) return res.status(400).send({
      type: 'not-verifified',
      msg: 'No existe un usuario asociado al token. Verifique que su token no haya expirado'
    });

    Usuario.findById(token._userId, function (err, usuario) {
      if (!usuario) return res.status(400).send({
        msg: 'No existe un usuario asociado al token'
      });
      res.render('session/resetPassword', {
        errors: {},
        usuario: usuario
      });
    });
  });
});


app.post('/resetPassword', function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    res.render('session/resetPassword', {
      errors: {
        confirm_password: {
          message: 'No coincide con el password ingresado'
        }
      },
      usuario: new Usuario({
        email: req.body.email
      })
    });
    return;
  }
  Usuario.findOne({
    email: req.body.email
  }, function (err, usuario) {
    usuario.password = req.body.password;
    usuario.save(function (err) {
      if (err) {
        res.render('session/resetPassword', {
          errors: err.errors,
          usuario: new Usuario({
            email: req.body.email
          })
        });
      } else {
        res.redirect('login');
      }
    });
  });
});

app.use('/privacy_policy', function (req, res) {
  res.sendFile('public/policy_privacy.html');
});

app.get('/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapi.com/auth/pus.login',
      'https://www.googleapi.com/auth/pus.profile.emails.read'

    ]
  }));

app.get('/auth/google/callback', passport.autenticate('googgle', {
  successRedirect: '/',
  failureRedict: '/error'
}));






app.use('/usuarios', usuariosRouter);
app.use('/tokens', tokensRouter);
app.use('/api/auth', authApiRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', loggeIn, bicicletasRouter);
app.use('/api/bicicletas', validarUsuario, bicicletasAPIRouter);
app.use('/api/usuarios', usuarioAPIRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function loogedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    console.log('user sin loguarse');
    res.redirect('/login');
  }
}

function validarUsuario(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req - app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({
        status: "error",
        message: err.message,
        data: null
      });
    } else {
      req.body.userId = decoded.Id;
      console.log('jwt verify: ' + decoded);
      next();
    }
  });
}



module.exports = app;