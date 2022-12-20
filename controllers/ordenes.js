const OrdenesMongo = require("../daos/ordenes");
const { Ordenes } = require("../utils/schemas/schemas");

const orden = new OrdenesMongo();
const mailOrden = require("../utils/nodemailer");
const generarOrden = async (req, res) => {
  const { email, productos, total, direccion, ciudad } = req.body;
  const getAll = await orden.getAll();

  let numero = getAll.length + 1;

  let newOrden = new Ordenes({
    email,
    productos,
    total,
    numero,
    ciudad, 
    direccion
  });
  const result = await orden.insertar(newOrden);

  console.log("result:", result);
  if (result) {
    mailOrden(email, result);
    res.json(result);
  } else {
    res.json({ message: "Error, vuelva a intentarlo" });
  }
};

const getOrderByUser = async (req, res) => {
  const email = req.params.email;
  const result = await orden.getByEmail(email);
  const orders = result.map(i => {
    let order = {
        email: i.email,
        numero: i.numero,
        productos: i.productos,
        estado: i.estado,
        fecha: i.timestamp.toString(),
        total: i.total
    };
    return order
});
  // const {estado, numero, productos} = result

  // const dataOrder = result.forEach(e => {

  //     return e})
    result.length !==0 ? res.json(orders) :
    res.json({message:"No existen ordenes con este email"})

    // if (result) {
    //   res.json(result);
    // } else {
    //   res.json({ message: "Este usuario no tiene ordenes" });
    // }
};
module.exports = { generarOrden, getOrderByUser };
