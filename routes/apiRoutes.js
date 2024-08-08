const express = require("express");
const router = express.Router();
const County = require("../models/county");
const {
  BadParamsError,
  DocumentNotFoundError,
} = require("../lib/custom_errors");
const processString = require("../lib/processString");

router.get("/index", (__, res) => {
  County.find({})
    .sort("state")
    .then((foundCounties) => {
      res.json(foundCounties);
    })
    .catch((err) => console.log(err));
});

router.get("/search", async (req, res, next) => {
  if ((!req.query.state || !req.query.countyName) && !req.query.countyCode) {
    const err = new BadParamsError(req.query);
    next(err);
  }

  if (req.query.state && req.query.countyName && !req.query.countyCode) {
    const abbrev = req.query.state.toUpperCase();
    const countyName = processString(req.query.countyName);
    try {
      const county = await County.findOne({
        abbrev,
        name: { $regex: countyName },
      });
      if (!county) {
        throw new DocumentNotFoundError(req.query);
      }
      res.json(county.toObject());
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    try {
      const county = await County.findOne({
        fips: { $regex: String(req.query.countyCode) },
      });
      if (!county) {
        throw new DocumentNotFoundError();
      }
      res.json(county.toObject());
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
});

module.exports = router;
