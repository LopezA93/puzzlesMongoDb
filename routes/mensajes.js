const express = require('express');
const {Router} = express

const chatRoute= Router()
const {getMsj, saveMsj} = require('../controllers/mensajes')

chatRoute.get('/', getMsj)
chatRoute.post('/', saveMsj)
// chat.get('/:email', )

module.exports = chatRoute