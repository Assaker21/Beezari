const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");

router.get("/", async (req, res) => {
  if (req.query.username == null) {
    res.render("login/index", {
      connectionMessage: "",
      connectionType: "",
      searchOptions: {
        username: "",
        password: "",
      },
    });
  } else {
    try {
      if (req.query.username == "" || req.query.password == "") {
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
          username: req.query.username,
          password: req.query.password,
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
    } catch {
      res.redirect("/");
    }
  }
});

module.exports = router;
