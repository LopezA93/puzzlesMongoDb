const CarritoMongo = require("../daos/carritos");

const { Carritos, User } = require("../utils/schemas/schemas");

const cart = new CarritoMongo();

const getCarts = async (req, res) => {
  const getAll = await cart.getAll();
  if (getAll.length == 0) {
    res.json({ message: "No hay carritos generados" });
  } else {
    res.json(getAll);
  }
};

const getByEmail = async (req, res) => {
  const email = req.params.email;
  const usuario = await User.findOne({ email: email });
  if (!usuario) {
    res.status(201).json({ message: "Error vuelva a intentarlo" });
    return;
  }
  Carritos.findOne({ userId: usuario._id })
    .populate("userId")
    .exec(function (err, cart) {
      if (err) return console.log(err);
      res.json(cart);
    });
};

const saveCart = async (req, res) => {

  const email = req.params.email;
  const { productos } = req.body;
  console.log("email", email);
  const usuario = await User.findOne({ email: email });
  if (!usuario) {
    res.status(201).json({ message: "Error vuelva a intentarlo" });
    return;
  }

  const newCart = new Carritos({
    userId: usuario._id,
    productos: productos,
  });

  const result = await cart.insertar(newCart);
  usuario.carrito.push(newCart)
  console.log("carrito del user", usuario.carrito)
  await usuario.save()

  result
    ? res.json(result)
    : res.json({ message: "Error, vuelva a intentarlo" });
};



const updateCart = async (req, res) => {
  const id = req.params.id
  const product= req.body
  const update= await cart.actualizar(id, {product})
  res.json(update)

  

}

const deleteCart = async (req, res) => {
  try {
    const id = req.params.id;
    const eliminado = await cart.eliminar(id);
    eliminado
      ? res.json({ message: "Cart eliminado exitosamente" })
      : res.json({ message: "Error, vuelva a intentarlo" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getCarts, saveCart, getByEmail,deleteCart, updateCart };
