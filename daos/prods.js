const ContenedorMongoDB = require('../contenedor/contenedor')

const {Productos} = require('../utils/schemas/schemas')

class ProductosMongo extends ContenedorMongoDB {
    constructor() {
        super(Productos)
    }
}
module.exports= ProductosMongo