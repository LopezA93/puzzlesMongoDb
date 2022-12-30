const express = require('express');
const {Router} = express;
const {generarOrden, getOrderByUser} = require('../controllers/ordenes')
const ordenRoute = Router()


ordenRoute.post('/', generarOrden)
ordenRoute.get('/:email', getOrderByUser)

module.exports = ordenRoute