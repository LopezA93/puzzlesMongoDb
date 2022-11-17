const express = require('express')
const PORT = 8080
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo');


//Routes
const productRoute = require('./routes/productos')
const userRoute = require('./routes/users');
const chatRoute = require('./routes/mensajes');
const ordenRoute= require('./routes/ordenes')

//Config
const connection = require('./database/config');
const passport = require('passport');
connection()
require('dotenv').config()
require('./auth/auth')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Session
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(session({
    //Base de datos Mongo
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE,
        mongoOptions,
        retries: 0,
        ttl:600,
        cookie: {
            maxAge: 600,

        }
    }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true

}));
app.use(passport.session())
app.use(passport.initialize())


app.use('/products', productRoute)
app.use('/users', userRoute)
app.use('/chat', chatRoute);
app.use('/orden', ordenRoute)

//
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido' })
});

app.get('*', (req, res) => {
    res.status(404).send(`Ruta: ${req.url} no encontrada`)
})




//Server On
const server = app.listen(PORT, () => {
    console.log('Servidor online puerto:', PORT)
});

server.on('error', ()=> {
    console.log(error)
})
