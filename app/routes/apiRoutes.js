const router = require("express").Router();
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
  if (!req.query.state || !req.query.countyName) {
    throw new Error("Missing state or countyName");
  }
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
});

export default router;
