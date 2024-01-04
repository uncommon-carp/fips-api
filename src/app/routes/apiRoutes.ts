import { Router, Request, Response } from "express";
import { County } from "../../models/county.js";

const router = Router();
// show all countys and counties
router.get("/index", (__, res: Response) => {
  County.find({})
    .sort("state")
    .then((foundCounties: any) => {
      res.json(foundCounties);
    })
    .catch((err: Error) => console.log(err));
});

router.get("/search", (req: Request, res: Response) => {
  if (!req.query.state || !req.query.countyName) {
    throw new Error("Missing state or countyName");
  }
  const abbrev: string = (req.query.state as string).toUpperCase();
  County.findOne({
    abbrev,
    name: { $regex: req.query.countyName },
  })
    .then((foundCounty: any) => {
      console.log(foundCounty);
      !foundCounty
        ? res.json("No results found")
        : res.json(foundCounty.toObject());
    })
    .catch((err: Error) => console.log(err));
});

export default router;
