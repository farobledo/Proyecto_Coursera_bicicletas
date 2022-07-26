var Bicicleta = function (id, color, model, ubicacion) {
  this.id = id;
  this.color = color;
  this.model = model;
  this.ubicacion = ubicacion;
};

Bicicleta.prototype.toString = function () {
  return (
    "Bicicleta: " +
    this.id +
    " " +
    this.color +
    " " +
    this.model +
    " " +
    this.ubicacion
  );
};

Bicicleta.allBicis = [];
Bicicleta.add = function (bic) {
  Bicicleta.allBicis.push(bic);
};

Bicicleta.findById = function (aBiciId) {
  var aBici = Bicicleta.allBicis.find(x => x.if === aBiciId);
   if (aBici) {
    return aBici;
    } else {
      throw new Error(`La bicicleta no existe depende del id  ${aBiciId}`);
  }
}

  Bicicleta.removeById = function (aBiciId) {
    for (var i = 0; i < Bicicleta.allBicis.length; i++) {
      if (Bicicleta.allBicis[i].id === aBiciId) {
        Bicicleta.allBicis.splice(i, 1);
        break
      }
    }
  }



var a = new Bicicleta(1, "rojo", "urbana", [51.505, -0.09]);
var b = new Bicicleta(2, "azul", "urbana", [51.505, -0.09]);

Bicicleta.add(a);
Bicicleta.add(b);

module.exports = Bicicleta;
