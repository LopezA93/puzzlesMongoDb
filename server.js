const express = require('express')
const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Server On
app.listen(PORT, ()=> {
    console.log('Servidor online puerto:', PORT)
})