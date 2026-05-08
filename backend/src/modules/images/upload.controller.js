import ApiResponse from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import * as uploadService from "./upload.service.js"

export const uploadImageController = asyncHandler(async (req, res) => {
  console.log(req.files)
  const result = await uploadService.uploadImage(req.files)
  res.status(201).json(
    new ApiResponse(201, result, "Images uploaded")
  )
})
