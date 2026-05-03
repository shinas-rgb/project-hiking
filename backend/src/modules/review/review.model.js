import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    placeId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    rating: Number,
    review: String,
    userName: String,
    placeName: String,
  },
  { timestamps: true }
)

const Review = mongoose.model("Review", reviewSchema)
export default Review
