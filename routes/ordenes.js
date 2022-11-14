const express = require('express');
const {Router} = express;
const generarOrden = require('../controllers/ordenes')
const ordenRoute = Router()


ordenRoute.post('/', generarOrden)


module.exports = ordenRoute