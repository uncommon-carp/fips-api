const express = require("express");
const router = express.Router();
const County = require("../../models/county");

router.get("/index", (__, res) => {
  County.find({})
    .sort("state")
    .then((foundCounties) => {
      res.json(foundCounties);
    })
    .catch((err) => console.log(err));
});

router.get("/search", (req, res) => {
  if ((!req.query.state || !req.query.countyName) && !req.query.countyCode) {
    throw new Error("Invalid search");
  }

  if (req.query.state && req.query.countyName && !req.query.countyCode) {
    const abbrev = req.query.state.toUpperCase();
    County.findOne({
      abbrev,
      name: { $regex: req.query.countyName },
    })
      .then((foundCounty) => {
        console.log(foundCounty);
        !foundCounty
          ? res.json("No results found")
          : res.json(foundCounty.toObject());
      })
      .catch((err) => console.log(err));
  } else {
    County.findOne({
      fips: { $regex: String(req.query.countyCode) },
    })
      .then((foundCounty) => {
        console.log(foundCounty);
        !foundCounty
          ? res.json("No results found")
          : res.json(foundCounty.toObject());
      })
      .catch((err) => console.log(err));
  }
});

module.exports = router;
