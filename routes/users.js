const express = require("express");
const { Router } = express;

const users = Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

users.post(
  "/signup",
  passport.authenticate("signup", {
    failureRedirect: "/users/signupfail",
    session: false,
  }),
  (req, res) => {
    res.status(201).json({
      message: "Signup success",
    });
  }
);

users.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/users/loginfail",
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      {
        data: {
          email: user.email,
          role: user.role
        },
      },
      process.env.SECRET_KEY,
      { expiresIn: "1m" }
    );
    req.session.user = user.email;
    res.status(201).json({
      // user:user
      email: user.email,
      nombre: user.nombre,
      direccion: user.direccion,
      telefono: user.telefono,
      role: user.role,
      token,
    });
  }
);

const authJWT = passport.authenticate("jwt", { session: false });
users.get("/profile", authJWT, (req, res) => {
  const user = req.user;

  res.status(201).json({ message: `Bienvenido ${user.data.email}  ` });
});

users.get("/signupfail", (req, res) => {
  res.status(401).send({ message: "Usuario ya existente" });
});
users.get("/loginfail", (req, res) => {
  res.status(401).send({ message: "Usuario o contraseña invalidas" });
});
users.get("/logout", (req, res) => {
  req.session.destroy();
  req.logout(() => {
    res.send("deslogueado exitosamente");
  });
});

module.exports = users;
