const express = require('express');
const {Router} = express;
const {generarOrden, getOrderByUser} = require('../controllers/ordenes')
const ordenRoute = Router()
// const cors = require('cors')
// ordenRoute.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "https://puzzlesmongodb.netlify.app")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
//CRUD

ordenRoute.post('/', generarOrden)
ordenRoute.get('/:email', getOrderByUser)

module.exports = ordenRoute