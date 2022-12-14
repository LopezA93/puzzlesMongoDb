const express = require('express')
const {Router} = express

const {getCarts, saveCart, getByEmail,deleteCart, updateCart} = require('../controllers/carritos')

const carrito = Router()

carrito.get('/', getCarts)
carrito.get('/:email', getByEmail)

carrito.post('/', saveCart)
carrito.put('/:id', updateCart)
carrito.delete('/:email', deleteCart )

module.exports= carrito