const express = require('express');
const { Router } = express;

const productRoute = Router()

const { 
    getProds,
    getProdById,
    saveProd,
    updateProd,
    delProd, 
    getProdByCategory} = require('../controllers/prods')

productRoute.use(express.json())
productRoute.use(express.urlencoded({ extended: false }))



//Get all
productRoute.get('/', getProds)

//Get by Id
// productRoute.get('/:id', getProdById);

//Gey by Category
productRoute.get('/:categoria', getProdByCategory)

//Send prod
productRoute.post('/', saveProd)

//Update
productRoute.put('/:id', updateProd)

//Delet
productRoute.delete('/:id', delProd)

module.exports = productRoute