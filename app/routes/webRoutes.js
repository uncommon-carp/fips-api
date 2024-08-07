const express = require("express");
const router = express.Router();
const County = require("../../models/county");
const processString = require("../../lib/processString");

router.get("/", (__, res) => {
  res.redirect("/docs");
});

router.get("/docs", (__, res) => {
  res.render("home");
});

router.get("/search", (req, res) => {
  if ((!req.query.countyName || !req.query.state) && !req.query.countyCode) {
    res.render("search");
  }

  if (req.query.state && req.query.countyName && !req.query.countyCode) {
    const countyName = processString(req.query.countyName);

    County.findOne({
      abbrev: req.query.state,
      name: { $regex: countyName },
    })
      .then((foundCounty) => {
        console.log(foundCounty);
        !foundCounty
          ? res.render("search", { county: { name: "No results found" } })
          : res.render("search", { county: foundCounty.toObject() });
      })
      .catch((err) => console.log(err));
  }
  if (req.query.countyCode && !req.query.countyName && !req.query.state) {
    County.findOne({
      fips: { $regex: String(req.query.countyCode) },
    })
      .then((foundCounty) => {
        console.log(foundCounty);
        !foundCounty
          ? res.render("search", { county: { name: "No results found" } })
          : res.render("search", { county: foundCounty.toObject() });
      })
      .catch((err) => console.log(err));
  }
});

module.exports = router;
