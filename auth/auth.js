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
        if(!usuario) {
            return done(null, false, console.log({message:'Usuario no encontrado'}))
        }
        const hassPass = usuario.password
        if (!comparePassword(password, hassPass)) {
            return done(null, null, console.log({ message: "Password invalida" }))
        }
        return done(null, usuario, console.log({ message: "Logeado correctamente" }))

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
    done(null, user.email)
})

passport.deserializeUser(async (email, done) => {
    const usuario = await user.findOne({email}) 
    done(null, usuario)

})