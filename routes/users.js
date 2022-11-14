const express = require('express');
const { Router } = express

const users = Router()
const jwt = require('jsonwebtoken');
const passport = require('passport');

users.post('/signup', passport.authenticate('signup', { session: false }), (req, res) => {
    res.json({
        message: 'Signup success',

    })
})

users.post('/login', passport.authenticate('login', { failureRedirect: '/users/error', session: false, }), (req, res) => {
   const user = req.user
    const token = jwt.sign({
        data: {
            email: user.email
        }
    }, process.env.SECRET_KEY, { expiresIn: "5m" })
    req.session.user = user.email
    res.send({
       user: user.email,
        token
    })
})

const authJWT = passport.authenticate('jwt', { session: false })
users.get('/profile', authJWT, (req, res) => {
    const user = req.user
    
    res.json({ message: `Bienvenido ${user.data.email}` })
})

users.get('/error', (req, res) => {
    res.send('Usuario o contraseña invalidas')
} )
users.get('/logout', (req, res) => {
    req.session.destroy();
    req.logout(() => {
        res.send("deslogueado exitosamente")
    })
})

module.exports = users