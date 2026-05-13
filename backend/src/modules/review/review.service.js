import ApiError from "../../utils/ApiError.js"
import Place from "../place/place.model.js"
import User from "../user/user.model.js"
import Review from "./review.model.js"
import mongoose from "mongoose"

export const createReview = async (data, userId, placeId) => {
  if (!userId) {
    throw new ApiError(400, "User not authenticated")
  }

  if (!placeId) {
    throw new ApiError(400, "Place ID required")
  }

  if (!mongoose.Types.ObjectId.isValid(placeId)) {
    throw new ApiError(400, "Invalid place ID")
  }

  const place = await Place.findById(placeId)
  if (!place) {
    throw new ApiError(404, "Place not found")
  }

  const { rating, review } = data

  if (rating == null || rating > 5 || rating < 1) {
    throw new ApiError(400, "Rating must be betwean 1 - 5")
  }

  if (!review) {
    throw new ApiError(400, "Review required")
  }

  const existing = await Review.findOne({ userId, placeId })
  if (existing) {
    throw new ApiError(400, "You already reviewed this place")
  }

  const user = await User.findById(userId)

  const newReview = await Review.create({
    rating,
    review,
    userId,
    placeId,
    userName: user.name,
    placeName: place.title
  })


  place.totalRating = place.totalRating ? place.totalRating + 1 : 1
  place.rating = (place.rating + rating) / (place.totalRating)

  await place.save()

  return {
    newReview,
    place
  }
}

export const getReviewsOfPlace = async (placeId) => {
  if (!placeId) {
    throw new ApiError(400, "Place ID required")
  }

  if (!mongoose.Types.ObjectId.isValid(placeId)) {
    throw new ApiError(400, "Invalid place ID")
  }

  const reviews = await Review.find({ placeId })
  return reviews
}

export const getReviewsOfUser = async (userId) => {
  if (!userId) {
    throw new ApiError(400, "User not authenticated")
  }

  const reviews = await Review.find({ userId })
  return reviews
}
