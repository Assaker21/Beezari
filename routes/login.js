const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");

router.get("/", checkNotAuthenticated, (req, res) => {
    res.render("login/index");
});

function checkNotAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
     return res.redirect("/"); 
  }
  else {
      next();
  }
}

/*router.post("/", async (req, res) => {
  try {
    if (req.body.username == "" || req.body.password == "") {
      res.render("login/index", {
        connectionMessage: "Empty username or password",
        connectionType: "active error",
        searchOptions: {
          username: "",
          password: "",
        },
      });
    } else {
      const searchOptions = {
        username: req.body.username,
        password: req.body.password,
      };
      const admin = await Admin.find(searchOptions);
      if (admin.length > 0) {
        res.render("login/index", {
          connectionMessage: "Connected Successfully",
          connectionType: "active",
          searchOptions: searchOptions,
        });
      } else {
        res.render("login/index", {
          connectionMessage: "Wrong username or password",
          connectionType: "active error",
          searchOptions: searchOptions,
        });
      }
    }
  } catch(error) {
    res.redirect("/?state=error&text=" + err.toString().replace(" ", "%20"));
  }
});*/

module.exports = router;
