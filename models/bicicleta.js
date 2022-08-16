var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bicicletaSchema = new Schema({
  code: Number,
  color: String,
  modelo: String,
  ubicacion: {
    type: [Number],
    index: { type: "2dsphere", sparse: true },
  },
});

bicicletaSchema.statics.createInstance = function(code, modelo, ubicacion){
  return new this({
    code: code,
    color: color,
    modelo: modelo,
    ubicacion: ubicacion
  });
}

bicicletaSchema.methods.toString = function () {
  return 'code: ' + this.code + ' | color: ' + this.color;
};

bicicletaSchema.statics.allBicis = function (cb) {
  return this.find({}, cb);
};


bicicletaSchema.statics.add = function(aBici, cb) {
  return this.create(aBici, cb);
};

bicicletaSchema.statics.findByCode = function(aCode, cb) {
  return this.findOne({code: aCode}, cb);
};

bicicletaSchema.statics.removeByCode = function(aCode, cb) {
  return this.deleteOne({code: aCode}, cb);
};


module.exports = mongoose.model("Bicicleta", bicicletaSchema);

// var Bicicleta = function (id, color, model, ubicacion) {
//   this.id = id;
//   this.color = color;
//   this.model = model;
//   this.ubicacion = ubicacion;
// };

// Bicicleta.prototype.toString = function () {
//   return (
//     "Bicicleta: " +
//     this.id +
//     " " +
//     this.color +
//     " " +
//     this.model +
//     " " +
//     this.ubicacion
//   );
// };

// Bicicleta.allBicis = [];
// Bicicleta.add = function (bic) {
//   Bicicleta.allBicis.push(bic);
// };

// Bicicleta.findById = function (aBiciId) {
//   var aBici = Bicicleta.allBicis.find(x => x.if === aBiciId);
//    if (aBici) {
//     return aBici;
//     } else {
//       throw new Error(`debe devolver la bicicleta con id 1  ${aBiciId}`);
//   }
// }

//   Bicicleta.removeById = function (aBiciId) {
//     for (var i = 0; i < Bicicleta.allBicis.length; i++) {
//       if (Bicicleta.allBicis[i].id === aBiciId) {
//         Bicicleta.allBicis.splice(i, 1);
//         break
//       }
//     }
//   }



// // var a = new Bicicleta(1, "rojo", "urbana", [51.505, -0.09]);
// // var b = new Bicicleta(2, "azul", "urbana", [51.505, -0.09]);

// // Bicicleta.add(a);
// // Bicicleta.add(b);

// module.exports = Bicicleta;
