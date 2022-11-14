const OrdenesMongo = require('../daos/ordenes')
const { ordenes } = require('../utils/schemas/schemas')

const orden = new OrdenesMongo
const mailOrden = require('../utils/nodemailer')
const generarOrden = async (req, res) => {

    const { nombre, precio, cantidad, productId } = req.body
    const getAll = await orden.getAll()

    let numero = getAll.length + 1

    let newOrden = new ordenes({
        email: req.session.user,
        productos: [{
            productId,
            cantidad,
            nombre,
            precio
        }],
        numero
    })
    const result = await orden.insertar(newOrden);

    console.log("result:", result)
    if (result) {
        mailOrden(req.session.user, result) 
        res.json(result)
    } else {
        res.json({ message: "Error, vuelva a intentarlo" })
    }

}

module.exports = generarOrden