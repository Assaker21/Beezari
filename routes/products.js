const { query } = require("express");
const express = require("express");
const { isObjectIdOrHexString } = require("mongoose");
const router = express.Router();
const Product = require("../models/product");
var ObjectId = require('mongodb').ObjectId;

router.get("/", async (req, res) => {
  try {
    let searchOptions = {};
    const products = await Product.find(searchOptions);
    res.render("products/index", { products: products, edited: req.query.id });
  } catch {
    res.redirect("/");
  }
});

router.get("/edit", async (req, res) => {
  try {
    const product = await Product.findById(req.query.id);
    res.render("products/editProduct", { product: product });
  } catch {
    res.redirect("/");
  }
});

router.post("/edit", async (req, res) => {
  try {
    const editedProduct = {
      sku: req.body.sku,
      name: req.body.name,
      brand: req.body.brand,
      long_description: req.body.long,
      short_description: req.body.short,
      price: req.body.price,
      discounted_price: req.body.discounted,
      quantity: req.body.quantity,
    };

    await Product.updateOne({ _id: ObjectId(req.body.id) }, editedProduct);

    res.redirect("/products");
  } catch {
    res.redirect("/");
  }
});

module.exports = router;
