import * as reviewService from "./review.service.js"
import ApiResponse from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"

export const createReviewController = asyncHandler(async (req, res) => {
  const result = await reviewService.createReview(req.body, req.user.id, req.params.id)
  res.status(201).json(
    new ApiResponse(201, result, "Review created")
  )
})

export const getReviewsOfPlaceController = asyncHandler(async (req, res) => {
  const result = await reviewService.getReviewsOfPlace(req.params.id)
  res.status(200).json(
    new ApiResponse(200, result, "Reviews fetched")
  )
})

export const getReviewsOfUserController = asyncHandler(async (req, res) => {
  const result = await reviewService.getReviewsOfUser(req.user.id)
  res.status(200).json(
    new ApiResponse(200, result, "Reviews fetched")
  )
})

export const deleteReviewController = asyncHandler(async (req, res) => {
  const placeId = req.params.id
  const result = await reviewService.deleteReview(req.user.id, placeId)
  res.status(200).json(
    new ApiResponse(200, result, "Review deleted")
  )
})
