const express = require('express');
const { Router } = express;

const productRoute= Router()
productRoute.use(express.json())
productRoute.use(express.urlencoded({extended:true}))


productRoute.get('/', (req, res) => {
    res.json({message:"asdads"})
})

module.exports= productRoute