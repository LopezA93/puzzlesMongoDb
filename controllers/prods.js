const ProductosMongo = require('../daos/prods');

const { Productos } = require('../utils/schemas/schemas')

const prods = new ProductosMongo

const getProds = async (req, res) => {

    const getAll = await prods.getAll();

    if (getAll.length == 0) {

        res.json({ message: "No hay productos" })
    } else {

        res.json(getAll)
    }
}

// const getProdById = async (req, res) => {
//     const id = req.params.id
//     const filtrado = await prods.getById(id)
//     filtrado ?
//         res.json(filtrado) :
//         res.json({ message: "Error, no se encuentra producto" })
// };

const getProdByCategory = async (req, res) => {
    const params = req.params.filter.toLowerCase();
    if (params.length >= 10) {
        
        const filtrado = await prods.getById(params)
        filtrado ?
            res.json(filtrado) :
            res.send({ message: "Error, no se encuentra producto" })
    } else {
        const filtrado = await prods.getByCategory(params)
        filtrado.length !== 0 ?
            res.json(filtrado) :
            res.json({ message: "Error, no se encuentra productos con la categoria ingresada." })
    }

}

const saveProd = async (req, res) => {
    const {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
        categoria

    } = req.body
    const newItem = new Productos({
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock,
        categoria: categoria

    })
    const result = await prods.insertar(newItem);
    result ?
        res.json(result) :
        res.json({ message: "Error, vuelva a intentarlo" })
}

const updateProd = async (req, res) => {
    const id = req.params.id
    const filter = { _id: id }
    const {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
        categoria

    } = req.body

    const updItem = {

        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock,
        categoria: categoria
    };
    const result = await prods.actualizar(filter, updItem);
    result ?
        res.json({ message: 'Producto actualizado exitosamente' }) :
        res.json({ message: "Error, on se encuentra producto a actualizar" })
};


const delProd = async (req, res) => {
    try {
        const id = req.params.id;
        const eliminado = await prods.eliminar(id)
        eliminado ?
            res.json({ message: 'Producto eliminado exitosamente' })
            :
            res.json({ message: "Error, no se encuentra producto a eliminar" })

    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getProds,
    // getProdById,
    saveProd,
    updateProd,
    delProd,
    getProdByCategory

}