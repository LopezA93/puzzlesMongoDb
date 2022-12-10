const ContenedorMongoDB = require('../contenedor/contenedor')

const {Mensajes} = require('../utils/schemas/schemas')

class MensajesMongo extends ContenedorMongoDB {
    constructor() {
        super(Mensajes)
    }
}
module.exports= MensajesMongo