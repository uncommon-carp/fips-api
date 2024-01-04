"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const county_js_1 = require("../../models/county.js");
const router = (0, express_1.Router)();
// show all countys and counties
router.get("/index", (__, res) => {
    county_js_1.County.find({})
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
    county_js_1.County.findOne({
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
exports.default = router;
//# sourceMappingURL=apiRoutes.js.map