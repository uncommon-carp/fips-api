"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const county_1 = require("../../models/county");
const router = (0, express_1.Router)();
router.get("/", (__, res) => {
    res.redirect("/docs");
});
router.get("/docs", (__, res) => {
    res.render("home");
});
router.get("/search", (req, res) => {
    if (!req.query.countyName || !req.query.state) {
        res.render("search");
    }
    else {
        county_1.County.findOne({
            abbrev: req.query.state,
            name: { $regex: req.query.countyName },
        })
            .then((foundCounty) => {
            // const foundCounty = foundState.counties.filter(county => county.county.includes(req.query.countyName))
            console.log(foundCounty);
            !foundCounty
                ? res.render("search", { county: { name: "No results found" } })
                : res.render("search", { county: foundCounty.toObject() });
        })
            .catch((err) => console.log(err));
    }
});
exports.default = router;
//# sourceMappingURL=webRoutes.js.map