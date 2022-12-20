const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const prodSchema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    codigo: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoria: { type: String, require: true },
    cantidad: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, min: 8 },
  nombre: { type: String, required: true },
  telefono: { type: Number, required: true },
  direccion: { type: String, required: true },
  ciudad: { type:String, required:true},
  role: { type: String, required: true, default: "user" },
  carrito: [{ type: Schema.Types.ObjectId, ref: "carrito" }],
});
const User = mongoose.model("usuarios", userSchema);

const mensajesSchema = new Schema({
  email: { type: String, required: true },
  // tipo: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  texto: { type: String, required: true, max: 400 },
});
const carritoSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },

    productos: [
      {
        cantidad: { type: Number, required: true },
        nombre: { type: String, required: true },
        precio: { type: Number, required: true },
      },
    ],
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const ordenesSchema = new Schema({
  email: { type: String, required: true, ref: "User" },
  estado: { type: Boolean, default: true },
  productos: [
    {
      nombre: { type: String, required: true },
      precio: { type: Number, required: true },
      cantidad: { type: Number, required: true },
    },
  ],
  direccion: { type: String, required: true },
  ciudad: { type:String, required:true},
  total: { type: Number, required: true },
  numero: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});
const Productos = mongoose.model("productos", prodSchema);
const Mensajes = mongoose.model("mensajes", mensajesSchema);
const Ordenes = mongoose.model("ordenes", ordenesSchema);
const Carritos = mongoose.model("carrito", carritoSchema);

module.exports = {
  Productos,
  prodSchema,
  userSchema,
  User,
  Mensajes,
  mensajesSchema,
  Carritos,
  carritoSchema,
  ordenesSchema,
  Ordenes,
};
