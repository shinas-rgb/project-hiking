import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    place: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    userEmail: String,
    placeTitle: String,
    rating: Number,
    review: String,
  },
  { timestamps: true }
)

const Review = mongoose.model("Review", reviewSchema)
export default Review
