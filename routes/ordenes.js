const express = require('express');
const {Router} = express;
const {generarOrden, getOrderByUser} = require('../controllers/ordenes')
const ordenRoute = Router()
const cors = require('cors')
//CRUD

ordenRoute.post('/', generarOrden)
ordenRoute.get('/:email', cors({origin:'*'}), getOrderByUser)

module.exports = ordenRoute