import * as fips from "./lib/fips_lookup_by_state.json";
import mongoose from "mongoose";
const states = Object.values(fips);

// const State = require('./models/state')
import { County } from "./models/county.js";
import { db } from "./config/connection.js";

mongoose.connect(db);

mongoose.connection.on("open", () => {
  console.log(`Connected to ${db}`);
  const seedCounties = [];

  states.forEach((state) => {
    // turn the object's attributes into arrays
    let counties = Object.entries(state);
    // remove the first three array items because they're state info
    counties.splice(0, 3);
    //turn each of the remaining arrays into a county object inside the new state's counties array
    counties.forEach((county) => {
      const newCounty = {
        name: county[0],
        fips: county[1],
        state: state._name,
        stateFips: state._fips,
        abbrev: state._abbrev,
      };
      seedCounties.push(newCounty);
    });
  });

  console.log("before deleteMany");
  County.deleteMany({})
    .then(() => {
      // Seed Counties
      County.create(seedCounties)
        .then(() => {
          console.log("Counties created");
          mongoose.connection.close();
        })
        .catch((error) => {
          console.log(error);
          mongoose.connection.close();
        });
    })
    .catch((error) => {
      console.log(error);
      mongoose.connection.close();
    });
});
