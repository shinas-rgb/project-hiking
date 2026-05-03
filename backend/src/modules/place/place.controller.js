import * as placeService from "./place.service.js"
import ApiResponse from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"

export const getAllPlacesController = asyncHandler(async (req, res) => {
  const result = await placeService.getAllPlaces(req.query)
  res.status(200).json(
    new ApiResponse(200, result, "Places fetched")
  )
})

export const createPlaceController = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const result = await placeService.createPlace(req.data, userId)
  res.status(201).json(
    new ApiResponse(201, result, "Place created")
  )
})

export const getPlaceByIdController = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const result = await placeService.getPlaceById(id)
  res.status(200).json(
    new ApiResponse(200, result, "Place fetched")
  )
})

export const updatePlaceController = async (req, res, next) => {
  try {
    const userId = req.user.id
    const result = await placeService.updatePlace(req.body, req.prams.id, userId)
    res.status(200).json({ data: result })
  } catch (error) {
    next(error)
  }
}

export const deletePlaceController = async (req, res, next) => {
  try {
    const userId = req.user.id
    const result = await placeService.deletePlace(req.params.id, userId)
    res.status(200).json({ data: result, message: "Place deleted" })
  } catch (error) {
    next(error)
  }
}
