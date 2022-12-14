const MensajesMongo = require("../daos/mensajes");
const { Mensajes } = require("../utils/schemas/schemas");

const msj = new MensajesMongo();

const saveMsj = async (req, res) => {
  const {
    email,

    texto,
  } = req.body;
  const newMsj = new Mensajes({
    email: email,

    texto: texto,
  });
  const result = await msj.insertar(newMsj);
  result
    ? res.json(result)
    : res.json({ message: "Error, vuelva a intentarlo" });
};

const getMsj = async (req, res) => {
  const getAll = await msj.getAll();
  const mensj = getAll.map((i) => {
    let mensaje = {
      email: i.email,
      texto: i.texto,
      fecha: i.timestamp,
    };
    return mensaje;
  });
  res.send(mensj);
};
const getMsjByEmail = async (req, res) => {
  const email = req.params.email;
  const getByEmail = await msj.getByEmail(email);
  const mensj = getByEmail.map((i) => {
    let mensaje = {
      email: i.email,
      texto: i.texto,
    };
    return mensaje;
  });
  res.send(mensj);
};

module.exports = { getMsj, saveMsj, getMsjByEmail };
