import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as adminService from "./admin.service.js"

export const getAllUsersController = asyncHandler(async (req, res) => {
  const result = await adminService.getAllUsers()
  res.status(200).json(
    new ApiResponse(200, result, "Users fetched")
  )
})

export const getAllPlacesController = asyncHandler(async (req, res) => {
  const result = await adminService.getAllPlaces()
  res.status(200).json(
    new ApiResponse(200, result, "Places fetched")
  )
})
