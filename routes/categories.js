const express = require("express");
const router = express.Router();

const Category = require("../models/category");

router.get("/", checkAuthenticated, async (req, res) => {
  const categories = await Category.find({});
  res.render("categories/index", { categories: categories });
});

router.post("/", async (req, res) => {
  try {
    var categories = PopulateCategoriesObject(
      ConvertToArray(req.body.categoryName),
      ConvertToArray(req.body.subcategoryName),
      ConvertToArray(req.body.microcategoryName),
      ConvertStringArrayToNumberArray(req.body.categoriesCount),
      ConvertStringArrayToNumberArray(req.body.subcategoriesCount),
      ConvertStringArrayToNumberArray(req.body.microcategoriesCount)
    );

    await Category.deleteMany({});
    await Category.insertMany(categories);

    res.redirect("/?state=noterror&text=Categories%20updated%20successfully");
  } catch (err) {
    res.redirect("/?state=error&text=" + err.toString().replace(" ", "%20"));
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

function ConvertStringArrayToNumberArray(maybearr) {
  var arr = ConvertToArray(maybearr);
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
  var categories = new Array(cats);

  var subsum = 0;
  var microsum = 0;
  for (i = 0; i < catsCount; i++) {
    if (subsCount[i] == 0) {
      categories[i] = { name: cats[i], sub: new Array(1) };
      categories[i].sub[0] = { name: "ALL", micro: new Array(1) };
      categories[i].sub[0].micro[0] = "ALL";
    } else {
      categories[i] = { name: cats[i], sub: new Array(subsCount[i]) };

      for (j = 0; j < subsCount[i]; j++) {
        if (microsCount[subsum + j] == 0) {
          categories[i].sub[j] = {
            name: subs[subsum + j],
            micro: new Array(1),
          };
          categories[i].sub[j].micro[0] = "ALL";
        } else {
          categories[i].sub[j] = {
            name: subs[subsum + j],
            micro: new Array(microsCount[subsum + j]),
          };

          for (k = 0; k < microsCount[subsum + j]; k++) {
            categories[i].sub[j].micro[k] = micros[microsum + k];
          }
        }
        microsum += microsCount[subsum + j];
      }
    }
    subsum += subsCount[i];
  }

  return categories;
}

function checkAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
      return next();
  }
  else {
      res.redirect("/login");
  }
}

module.exports = router;
