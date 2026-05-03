import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
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

    difficulty: {
      type: [String],
      enum: ['Easy', 'Moderate', 'Hard']
    },
    bestSeason: [String],
    season: String,
    bestTime: String,
    route: String,
    tips: [String],
    features: [String],

    duration: Number,
    distance: Number,
    trending: {
      type: Boolean,
      default: false,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

placeSchema.index({ location: "2dsphere" })
const Place = mongoose.model("Place", placeSchema)
export default Place;
