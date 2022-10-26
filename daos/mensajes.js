const ContenedorMongoDB = require('../contenedor/contenedor')

const {mensajes} = require('../utils/schemas/schemas')

class MensajesMongo extends ContenedorMongoDB {
    constructor() {
        super(mensajes)
    }
}
module.exports= MensajesMongo