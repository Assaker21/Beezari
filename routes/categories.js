const express = require("express");
const router = express.Router();

const Category = require("../models/category");

router.get("/", async (req, res) => {
  const categories = await Category.find({});
  res.render("categories/index", { categories: categories });
});

router.post("/", async (req, res) => {
  try {
    var categories = PopulateCategoriesObject(
      req.body.categoryName,
      req.body.subcategoryName,
      req.body.microcategoryName,
      ConvertStringArrayToNumberArray(req.body.categoriesCount),
      ConvertStringArrayToNumberArray(req.body.subcategoriesCount),
      ConvertStringArrayToNumberArray(req.body.microcategoriesCount)
    );

    await Category.deleteMany({});
    await Category.insertMany(categories);

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

function ConvertStringArrayToNumberArray(arr) {
  var new_arr = new Array(arr.length);
  for (i = 0; i < arr.length; i++) {
    new_arr[i] = parseInt(arr[i]);
  }
  return new_arr;
}

function PopulateCategoriesObject(
  cats,
  subs,
  micros,
  catsCount,
  subsCount,
  microsCount
) {
  var categories = new Array(catsCount);
  for (i = 0; i < catsCount; i++) {
    categories[i] = { name: cats[i], sub: new Array(subsCount[i]) };

    var sum = 0;
    for (j = 0; j < subsCount[i]; j++) {
      categories[i].sub[j] = {
        name: subs[i * subsCount[i] + j],
        micro: new Array(microsCount[i * subsCount[i] + j]),
      };

      sum += microsCount[i * subsCount[i] + j] - 1;
      for (k = 0; k < microsCount[i * subsCount[i] + j]; k++) {
        categories[i].sub[j].micro[k] = micros[sum + k + 1];
      }
    }
  }

  return categories;
}

module.exports = router;
