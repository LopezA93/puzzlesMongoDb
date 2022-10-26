const express = require('express')
const PORT = 8080
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo');


//Routes
const productRoute = require('./routes/productos')
const userRoute = require('./routes/users');
const chatRoute = require('./routes/mensajes');


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
app.use('/chat', chatRoute)
//
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido' })
});



// const users = [{
//     email: "a@a.com",
//     password: "asd"
// }, {
//     email: "a1@a.com",
//     password: "asd"
// },
// ]
// const verificarToken = (req, res, next) => {
//     const headerToken = req.headers.authorization;
//     if(!headerToken) {
//         res.status(401).send({message: "No Autorizado"});
//         return
//     }
//     const token = headerToken?.split(" ")[1];
//     console.log(token);

//     try {

//         const validate = jwt.verify(token, process.env.SECRET_KEY)
//         res.send(validate)
//         next()
//     } catch (error) {
//         console.log(error);
//         res.status(401).send({message: "No Autorizado"});

//     }

// }
// app.post('/login', (req, res) => {
//     const { email, password } = req.body

//     if (!email || !password) {
//         res.send({ message: "Debe incluir email y password" });
//         return
//     }
//     const userfiltrado = users.find(u =>  u.email === email )
//     if (!userfiltrado || userfiltrado?.password !== password) {
//         res.send({ message: 'creden no validas' });
//         return
//     }
//     const token = jwt.sign({
//         data: {
//             email: userfiltrado.email
//         }
//     }, process.env.SECRET_KEY, { expiresIn: "5m" })
//     res.send({
//         user: {
//             email: userfiltrado.email,
//             password: userfiltrado.password
//         },
//         token
//     })


// })
// app.get('/profile', verificarToken, (req, res) => {
//     res.send('Bienvenido a tu perfil')
// })

//Server On
app.listen(PORT, () => {
    console.log('Servidor online puerto:', PORT)
});
