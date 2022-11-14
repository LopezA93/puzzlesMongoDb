const ContenedorMongoDB = require('../contenedor/contenedor');
const {ordenes} = require('../utils/schemas/schemas')

class OrdenesMongo extends ContenedorMongoDB {
    constructor() {
        super(ordenes)
    }
}
module.exports = OrdenesMongo