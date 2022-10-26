const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { user } = require('../utils/schemas/schemas');
const { hashPassword, comparePassword } = require('../utils/hashPassword')
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt
require('dotenv').config()



passport.use("signup", new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'
}, async (req, email, password, done) => {
    const usuario = await user.findOne({ email });
    if (usuario) {
        return done(null, false)


    }

    const hashedPassword = hashPassword(password);
    const newUser = new user({ email, password: hashedPassword });
    await newUser.save();
    return done(null, newUser);
}));


passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async ( email, password, done) => {

    try {
        const usuario = await user.findOne({ email });
        const hassPass = usuario.password
        if (!usuario || !comparePassword(password, hassPass)) {
            return done(null, false, new Error({ message: "Usuario no encontrado o password invalido" }))
        } else {

            return done(null, usuario, { message: "Logeado correctamente" })
        }
    } catch (error) {
        return done(error)
    }
}
))

passport.use(new JWTStrategy({
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, (payload, next) => {
    const user = payload;
    console.log(user);
    return next(null, user)
}
))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const usuario = await user.findOne(id)
    done(null, usuario)

})