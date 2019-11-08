const express = require("express");
const router = express();

const Product = require("../models/Product");
const User = require("../models/User");

const passport = require("passport");

router.post("/signup", (req, res, next) => {
  User.create(req.body)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/logIn", passport.authenticate("local"), function (req, res) {
  console.log(req.user)
  res.send(req.user);
});

router.get("/products", (req, res, next) => {
  Product.findAll().then(products => {
    res.json(products);
  });
});

module.exports = router;
