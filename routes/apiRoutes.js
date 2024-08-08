const express = require("express");
const router = express.Router();
const County = require("../models/county");
const { BadParamsError, handle404 } = require("../lib/custom_errors");
const processString = require("../lib/processString");

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
    throw new BadParamsError();
  }

  if (req.query.state && req.query.countyName && !req.query.countyCode) {
    const abbrev = req.query.state.toUpperCase();
    const countyName = processString(req.query.countyName);
    County.findOne({
      abbrev,
      name: { $regex: countyName },
    })
      .then(handle404)
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
      .then(handle404)
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
