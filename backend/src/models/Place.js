import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    images: [
      {
        url: String,
        public_id: String,
      }
    ],

    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }
    },

    difficulty: [String],
    bestSeason: [String],
    season: String,
    bestTime: String,
    route: String,
    tips: [String],
    features: [String],

    duration: Number,
    distance: Number,
    trending: Boolean,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: Number
  },
  { timestamps: true }
);

placeSchema.index({ location: "2dsphere" })
const Place = mongoose.model("Place", placeSchema)
export default Place;
