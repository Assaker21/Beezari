const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const FeaturedProducts = require("../models/featuredProducts");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    const editedProducts = new Array(products.length);
    for (i = 0; i < products.length; i++) {
      editedProducts[i] = {
        _id: products[i]._id.toString(),
        name: products[i].name,
        brand: products[i].brand,
        img: products[i].images[0],
        price: products[i].price,
        discountedPrice: products[i].discounted_price,
        purchasePower: products[i].purchase_power,
      };
    }

    const featuredProducts = await FeaturedProducts.find({});

    let populatedFeaturedProducts = new Array(featuredProducts.length);
    for (i = 0; i < populatedFeaturedProducts.length; i++) {
      populatedFeaturedProducts[i] = {
        place: featuredProducts[i].place,
        items: new Array(featuredProducts[i].items.length),
      };

      for (j = 0; j < featuredProducts[i].items.length; j++) {
        populatedFeaturedProducts[i].items[j] = {
          title: featuredProducts[i].items[j].title,
          products: new Array(featuredProducts[i].items[j].products.length),
        };

        for (k = 0; k < featuredProducts[i].items[j].products.length; k++) {
          let p = await Product.findById(
            mongoose.Types.ObjectId(featuredProducts[i].items[j].products[k])
          );

          populatedFeaturedProducts[i].items[j].products[k] = {
            _id: p._id,
            name: p.name,
            brand: p.brand,
            price: p.price,
            discounted_price: p.discounted_price,
            image: p.images[0],
            purchase_power: p.purchase_power,
          };
        }
      }
    }

    res.render("featuredProducts/index", {
      products: editedProducts,
      featuredProducts: populatedFeaturedProducts,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/?state=error&text=" + error.toString().replace(" ", "%20"));
  }
});

router.post("/", async (req, res) => {
  try {
    let _featuredProducts = new Array();
    let places = ConvertToArray(req.body.places);
    for (i = 0; i < places.length; i++) {
      _featuredProducts.push({ place: places[i], items: new Array() });

      for (j = 0; j < 10000; j++) {
        let title = req.body["title_" + i + "_" + j];
        if (title != null)
          _featuredProducts[i].items.push({
            title: title,
            products: new Array(),
          });
        else break;

        for (k = 0; k < 10000; k++) {
          let item = req.body["id_" + i + "_" + j + "_" + k];
          if (item != null) {
            _featuredProducts[i].items[j].products.push(item);
          } else {
            break;
          }
        }
      }
    }

    await FeaturedProducts.deleteMany({});
    await FeaturedProducts.insertMany(_featuredProducts);

    console.log(req.body);

    res.redirect("/?state=noterror&text=Featured+products+saved+successfully.");
  } catch (error) {
    res.redirect("/?state=error&text=" + error.toString().replace(" ", "%20"));
  }
});

function ConvertToArray(maybeArr) {
  if (Object.prototype.toString.call(maybeArr) == "[object Array]") {
    return maybeArr;
  } else {
    var arr = new Array(1);
    arr[0] = maybeArr;
    return arr;
  }
}

const removeSpaces = str => str.replace(/\s/g, '+');

module.exports = router;
