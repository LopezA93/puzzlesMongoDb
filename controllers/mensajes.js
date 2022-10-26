const MensajesMongo = require('../daos/mensajes');
const { mensajes } = require('../utils/schemas/schemas');

const msj = new MensajesMongo;

const saveMsj = async (req, res) => {

    const email = req.session.user;
    const {
        tipo,
        texto
    } = req.body
    const newMsj = new mensajes({ email: email, tipo: tipo, texto: texto });
    const result = await msj.insertar(newMsj);
    result ?
        res.json(result) :
        res.json({ message: "Error, vuelva a intentarlo" })
};

const getMsj = async (req, res) => {
    console.log(req.session.user)
    const getAll = await msj.getAll()
    const mensj = getAll.map(i => {
        let mensaje = {
            email: i.email,
            texto: i.texto
        };
        return mensaje
    });
    res.send(mensj)
};

module.exports = { getMsj, saveMsj }