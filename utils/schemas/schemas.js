const { Schema, model } = require('mongoose');


const prodSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    codigo: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoria: { type: String, require: true }

}, { timestamps: true })

const carritoSchema = new Schema({
    productos: { type: Object }

}, { timestamps: true })

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});
const mensajesSchema = Schema({
    email: { type: String, required: true},
    tipo: {type: String, required: true},
    timestamp: { type: Date, default: Date.now } ,
    texto: { type: String, required: true, max: 400 }
});


const productos = model('productos', prodSchema);
const carritos = model('carrito', carritoSchema);
const user = model('usuarios', userSchema);
const mensajes = model('mensajes', mensajesSchema);

module.exports = {
    productos,
    prodSchema,
    carritos,
    carritoSchema,
    userSchema,
    user,
    mensajes,
    mensajesSchema
}