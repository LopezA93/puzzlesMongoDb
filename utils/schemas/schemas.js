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
const mensajesSchema = new Schema({
    email: { type: String, required: true },
    tipo: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    texto: { type: String, required: true, max: 400 }
});

const ordenesSchema = new Schema({
    email: { type: String, required: true, ref: 'User' },
    estado: { type: Boolean, default: true },
    productos: [{
        productId: { type: String, required:true },
        cantidad: { type: Number, required:true },
        nombre: { type: String, required:true },
        precio: { type: Number, required:true }
    }],
    numero: { type: Number, required: true },


}, { timestamp: { type: Date, default: Date.now } })
const productos = model('productos', prodSchema);
const carritos = model('carrito', carritoSchema);
const user = model('usuarios', userSchema);
const mensajes = model('mensajes', mensajesSchema);
const ordenes = model('ordenes', ordenesSchema)
module.exports = {
    productos,
    prodSchema,
    carritos,
    carritoSchema,
    userSchema,
    user,
    mensajes,
    mensajesSchema,
    ordenesSchema,
    ordenes
}