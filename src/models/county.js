import { Schema, model } from "mongoose";

const countySchema = new Schema(
  {
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
  },
  {
    toObject: {
      virtuals: true,
      transform: (_doc, county) => {
        delete county._id;
        delete county.id;
        delete county.__v;
        return county;
      },
    },
  },
);

export const County = model("County", countySchema);
