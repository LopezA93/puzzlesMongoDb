const { Router } = require('express')
const express = require ('express')

const {Router} = express()

const productRoute= Router()



productRoute.get('/', (req, res) => {
    res.send('asdd')
})

module.exports= productRoute