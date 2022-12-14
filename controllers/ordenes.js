const OrdenesMongo = require("../daos/ordenes");
const { Ordenes, Productos } = require("../utils/schemas/schemas");
const orden = new OrdenesMongo();
const mailOrden = require("../utils/nodemailer");




const discountQty = async (nombre, cantidad) => {
  
    const filter = await Productos.findOne({nombre:nombre});
    if (!filter) return console.log("Error no hay producto")
    filter.stock = filter.stock - cantidad
    filter.save()
  
  

}
const uptStock = (items) => {
  items.map((i) => {
    let nombre = i.nombre
    let cantidad = i.cantidad
    discountQty(nombre, cantidad)

  })
}
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
    direccion,
  });
  uptStock(productos)
  const result = await orden.insertar(newOrden);
  

  if (result) {
    await mailOrden(email, result);
    res.json(result);
  } else {
    res.status(404).json({ message: "Error, vuelva a intentarlo" });
  }
};

const getOrderByUser = async (req, res) => {
  const email = req.params.email;
  const result = await orden.getByEmail(email);
  const orders = result.map((i) => {
    let order = {
      email: i.email,
      numero: i.numero,
      productos: i.productos,
      estado: i.estado,
      fecha: i.timestamp.toString(),
      total: i.total,
    };
    return order;
  });

  result.length !== 0
    ? res.json(orders)
    : res.json({ message: "No existen ordenes con este email" });
};
module.exports = { generarOrden, getOrderByUser };
