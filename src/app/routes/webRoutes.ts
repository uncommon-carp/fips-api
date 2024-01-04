import { Router, Request, Response } from "express";
import { County } from "../../models/county";

const router = Router();

router.get("/", (__, res: Response) => {
  res.redirect("/docs");
});

router.get("/docs", (__, res: Response) => {
  res.render("home");
});

router.get("/search", (req: Request, res: Response) => {
  if (!req.query.countyName || !req.query.state) {
    res.render("search");
  } else {
    County.findOne({
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

export default router;
