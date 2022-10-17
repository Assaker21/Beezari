const express = require("express");
const router = express.Router();

router.get("/", checkAuthenticated, (req, res) => {
  res.render("index", {
    state: req.query.state,
    text: req.query.text,
  });
});

function checkAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
      return next();
  }
  else {
      res.redirect("/login");
  }
}

module.exports = router;
