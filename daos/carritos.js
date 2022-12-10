const ContenedorMongoDB = require("../contenedor/contenedor");

const { Carritos } = require("../utils/schemas/schemas");

class CarritoMongo extends ContenedorMongoDB {
  constructor() {
    super(Carritos);
  }
}
module.exports = CarritoMongo;
