var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Reserva = require("./reserva");
const crypto = require("crypto");
const uniqueValidator = require("mongoose-unique-validator");


const bcrypt = require("bcrypt");
const saltRounds = 10;

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var usuarioSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: [true, "El nombre es necesario"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "El email es necesario"],
    lowercase: true,
    unique: true,
    validate: [validateEmail, "Por favor, ingrese un email válido"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Por favor, ingrese un email válido",
    ],
  },
  password: {
    type: String,
    required: [true, "La contraseña es necesaria"],
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  verificado: {
    type: Boolean,
    default: false,
  },

});

usuarioSchema.plugin(uniqueValidator, { message: "El {PATH} debe ser único" });


usuarioSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, saltRounds);

  }
  next();

});

usuarioSchema.method.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}


usuarioSchema.method.reservar = function (biciId, desde, hasta, cb) {
  var reserva = new Reserva({
    usuario: this._id,
    bicicleta: biciId,
    desde: desde,
    hasta: hasta,
  });
  console.log("reserva");
  reserva.save(cb);
};

usuarioSchema.method.enviar_email_bienvenida = function (cb) {
  const token = new Token({_userId: this._id, token: crypto.randomBytes(16).toString('hex')});
  const email_distination = this.email;
  token.save( function (err) { 
    if (err) { return console.log(err.message); }

 const mailOptions = {
  from: 'no-reply@redbicicletas.com',
    to: email_distination,
      subject: 'Verificación de cuenta',
        text: 'Hola,\n\n' + 'Para verificar tu cuenta , por favor, pulsa en el siguiente enlace: \n'+ 'http://localhost:3000' + '\/token/confirmation\/' + token.token + '.\n' 
};

mailer.sendMail(mailOptions, function (err) {
  if (err) { return console.log(err, message); }
  console.log('A message has been sent to ' + email_distination + '.');
});
});
}





module.exports = mongoose.model("Usuario", usuarioSchema);
