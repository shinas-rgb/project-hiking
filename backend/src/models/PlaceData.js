import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Place = mongoose.model("Place", placeSchema)

export default Place;
