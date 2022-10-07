const { query } = require("express");
const express = require("express");
const { isObjectIdOrHexString } = require("mongoose");
const router = express.Router();
const Product = require("../models/product");
const canvas = require("canvas");
global.Image = canvas.Image;

var ObjectId = require("mongodb").ObjectId;

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

    res.render("products/editProduct", { product: product, maxImageCount: 8 });
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
      images: ["", "", "", "", "", "", "", ""],
      long_description: req.body.long,
      short_description: req.body.short,
      price: req.body.price,
      discounted_price: req.body.discounted,
      quantity: req.body.quantity,
    };

    saveImagesToDatabase(editedProduct, req.body.uploadedImages);

    await Product.updateOne({ _id: ObjectId(req.body.id) }, editedProduct);

    res.redirect("/products");
  } catch {
    res.redirect("/");
  }
});

function saveImagesToDatabase(product, imagesEncoded) {
  if (imagesEncoded == null) return;

  var i = 0;
  if (imagesEncoded.length <= 0 || imagesEncoded.length > 8) {
    const image = JSON.parse(imagesEncoded);

    const buff = new Buffer.from(image.data, "base64").toString("base64");

    product.images[0] = `data:image/jpeg;charset=utf-8;base64,${buff}`;
  } else {
    imagesEncoded.forEach(async (imageEncoded) => {
      const image = JSON.parse(imageEncoded);

      const buff = new Buffer.from(image.data, "base64").toString("base64");

      product.images[i] = `data:image/jpeg;charset=utf-8;base64,${buff}`;

      i++;
    });
  }
}

module.exports = router;
