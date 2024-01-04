"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fips = __importStar(require("./lib/fips_lookup_by_state.json"));
const mongoose_1 = __importDefault(require("mongoose"));
const states = Object.values(fips);
// const State = require('./models/state')
const county_1 = require("./models/county");
const connection_1 = require("./config/connection");
mongoose_1.default.connect(connection_1.db);
mongoose_1.default.connection.on("open", () => {
    console.log(`Connected to ${connection_1.db}`);
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
    county_1.County.deleteMany({})
        .then(() => {
        // Seed Counties
        county_1.County.create(seedCounties)
            .then(() => {
            console.log("Counties created");
            mongoose_1.default.connection.close();
        })
            .catch((error) => {
            console.log(error);
            mongoose_1.default.connection.close();
        });
    })
        .catch((error) => {
        console.log(error);
        mongoose_1.default.connection.close();
    });
});
//# sourceMappingURL=seed.js.map