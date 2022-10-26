const ContenedorMongoDB = require('../contenedor/contenedor')

const {productos} = require('../utils/schemas/schemas')

class ProductosMongo extends ContenedorMongoDB {
    constructor() {
        super(productos)
    }
}
module.exports= ProductosMongo