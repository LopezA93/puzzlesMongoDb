const ContenedorMongoDB = require('../contenedor/contenedor');
const {Ordenes} = require('../utils/schemas/schemas')

class OrdenesMongo extends ContenedorMongoDB {
    constructor() {
        super(Ordenes)
    }
}
module.exports = OrdenesMongo