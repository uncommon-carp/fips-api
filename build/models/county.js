"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.County = void 0;
const mongoose_1 = require("mongoose");
const countySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    fips: {
        type: String,
        required: true,
    },
    stateFips: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    abbrev: {
        type: String,
        required: true,
    },
}, {
    toObject: {
        virtuals: true,
        transform: (_doc, county) => {
            delete county._id;
            delete county.id;
            delete county.__v;
            return county;
        },
    },
});
exports.County = (0, mongoose_1.model)("County", countySchema);
//# sourceMappingURL=county.js.map