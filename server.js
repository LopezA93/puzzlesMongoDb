const express = require('express')
const PORT = 8080
const app = express()
const productRoute = require('./routes/productos')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/products', productRoute)
app.get('/', (req, res) => {
    res.json({message:'Bienvenido'})
})
//Server On
app.listen(PORT, ()=> {
    console.log('Servidor online puerto:', PORT)
})