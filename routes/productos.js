const express = require("express");
const { Router } = express;

const productRoute = Router();

const {
  getProds,
  saveProd,
  updateProd,
  delProd,
  getProdByCategory,
} = require("../controllers/prods");
const isAuth = require("../middleware/auth");
productRoute.use(express.json());
productRoute.use(express.urlencoded({ extended: false }));

//Get all
productRoute.get("/", getProds);

//Gey by Category or Id
productRoute.get("/:filter", getProdByCategory);

//Send prod
productRoute.post("/", isAuth, saveProd);

//Update
productRoute.put("/:id", isAuth, updateProd);

//Delet
productRoute.delete("/:id", isAuth, delProd);

module.exports = productRoute;
