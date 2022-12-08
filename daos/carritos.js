const ContenedorMongoDB = require('../contenedor/contenedor')

const {carritos} = require('../utils/schemas/schemas')

class CarritoMongo extends ContenedorMongoDB {
    constructor() {
        super(carritos)
    }
}
module.exports= CarritoMongo