const passport = require("passport");
const authJWT = passport.authenticate("jwt", { session: false });

const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_KEY = process.env.SECRET_KEY;
const isAuth = (req, res, next) => {
  const headers = req.headers;
  if (!headers.authorization) {
    res.status(401).json({
      message: "Token requerido",
    });
    return;
  }
  const token = headers.authorization.split(" ")[1];
  try {
    const verified = jwt.verify(token, JWT_KEY || "");
    if (verified.data.role !== "admin") {
      res.status(401).json({
        message: "No autorizado",
      });
      return;
    }
  } catch (err) {
    res.status(400).json({
      message: "Token invalido",
    });
    return;
  }
  next();
};
module.exports = isAuth;
