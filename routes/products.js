const { query } = require("express");
const express = require("express");
const { isObjectIdOrHexString } = require("mongoose");
const router = express.Router();
const Product = require("../models/product");
const Category = require("../models/category");

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

router.post("/delete", async (req, res) => {
  try {
    await Product.deleteOne({ _id: ObjectId(req.body.id) });
    res.redirect("/products");
  } catch (error) {
    res.redirect("/?state=error&text=" + error.toString().replace(" ", "%20"));
  }
});

router.get("/new", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.render("products/newProduct", { categories: categories });
  } catch (error) {
    res.redirect("/?state=error&text=" + error.toString().replace(" ", "%20"));
  }
});

router.post("/new", async (req, res) => {
  try {
    var inline_categories = req.body.microcategoryState;

    if (inline_categories == null || inline_categories.length == 0) {
      res.redirect(
        "/?state=error&text=You%20did%20not%20add%20any%20categories"
      );
      return;
    }

    inline_categories = ConvertToArray(inline_categories);
    var categories = new Array(inline_categories.length);
    for (i = 0; i < inline_categories.length; i++) {
      const str = inline_categories[i].split(">");
      categories[i] = {
        category: str[0],
        subcategory: str[1],
        microcategory: str[2],
      };
    }

    const newProduct = {
      sku: req.body.sku,
      name: req.body.name,
      brand: req.body.brand,
      images: ["", "", "", "", "", "", "", ""],
      long_description: req.body.long,
      short_description: req.body.short,
      price: req.body.price,
      discounted_price: req.body.discounted,
      quantity: req.body.quantity,
      categories: categories,
    };

    if (
      req.body.uploadedImages == null ||
      req.body.uploadedImages.length == 0
    ) {
      res.redirect("/?state=error&text=You%20did%20not%20add%20any%20images");
      return;
    }
    saveImagesToVariable(newProduct, req.body.uploadedImages);

    await Product.insertMany([newProduct]);

    res.redirect("/products");
  } catch (error) {
    res.redirect("/?state=error&text=" + error.toString().replace(" ", "%20"));
    console.log(error);
  }
});

router.get("/edit", async (req, res) => {
  try {
    const product = await Product.findById(req.query.id);
    const categories = await Category.find({});

    res.render("products/editProduct", {
      product: product,
      maxImageCount: 8,
      categories: categories,
    });
  } catch (error) {
    res.redirect("/?state=error&text=" + error.toString().replace(" ", "%20"));
  }
});

router.post("/edit", async (req, res) => {
  try {
    var inline_categories = req.body.microcategoryState;

    if (inline_categories == null || inline_categories.length == 0) {
      res.redirect(
        "/?state=error&text=You%20did%20not%20add%20any%20categories"
      );
      return;
    }

    inline_categories = ConvertToArray(inline_categories);
    var categories = new Array(inline_categories.length);
    for (i = 0; i < inline_categories.length; i++) {
      const str = inline_categories[i].split(">");
      categories[i] = {
        category: str[0],
        subcategory: str[1],
        microcategory: str[2],
      };
    }

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
      categories: categories,
    };

    if (
      req.body.uploadedImages == null ||
      req.body.uploadedImages.length == 0
    ) {
      res.redirect("/?state=error&text=You%20did%20not%20add%20any%20images");
      return;
    }
    saveImagesToVariable(editedProduct, req.body.uploadedImages);

    await Product.updateOne({ _id: ObjectId(req.body.id) }, editedProduct);

    res.redirect("/products");
  } catch (error) {
    res.redirect("/?state=error&text=" + error.toString().replace(" ", "%20"));
  }
});

function saveImagesToVariable(product, imagesEncoded) {
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

function ConvertToArray(maybeArr) {
  if (Object.prototype.toString.call(maybeArr) == "[object Array]") {
    return maybeArr;
  } else {
    var arr = new Array(1);
    arr[0] = maybeArr;
    return arr;
  }
}

module.exports = router;
