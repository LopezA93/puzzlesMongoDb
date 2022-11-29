const express = require('express');
const {Router} = express

const chatRoute= Router()
const {getMsj, saveMsj,getMsjByEmail} = require('../controllers/mensajes')



//CRUD
chatRoute.get('/', getMsj)
chatRoute.post('/', saveMsj)
chatRoute.get('/:email', getMsjByEmail)




module.exports = chatRoute