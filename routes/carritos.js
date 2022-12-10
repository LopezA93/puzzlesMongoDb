const express = require('express')
const {Router} = express

const {getCarts, saveCart, getByEmail,deleteCart, updateCart} = require('../controllers/carritos')

const carrito = Router()

carrito.get('/', getCarts)
carrito.get('/:email', getByEmail)

carrito.post('/:email', saveCart)
carrito.put('/:id', updateCart)
carrito.delete('/:id', deleteCart )

module.exports= carrito