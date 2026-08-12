import * as UserService from "./user.service.js"
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const createUserController = asyncHandler(async (req, res) => {
  const result = await UserService.createUser(req.body)
  res.status(201).json(
    new ApiResponse(201, result, "User created")
  )
})

export const loginUserController = asyncHandler(async (req, res) => {
  const result = await UserService.loginUser(req.body)
  res.status(200).json(
    new ApiResponse(200, result, "Login successful")
  )
})

export const getCurrentUserController = asyncHandler(async (req, res) => {
  const result = await UserService.getCurrentUser(req.user.id)
  res.status(200).json(
    new ApiResponse(200, result, "User fetched")
  )
})

export const addToBookmarksController = asyncHandler(async (req, res) => {
  const result = await UserService.addToBookmarks(req.user.id, req.params.id)
  res.status(201).json(
    new ApiResponse(201, result, "Added to Bookmarks")
  )
})

export const removeFromBookmarksController = asyncHandler(async (req, res) => {
  const result = await UserService.removeFromBookmarks(req.user.id, req.params.id)
  res.status(201).json(
    new ApiResponse(201, result, "Removed from Bookmarks")
  )
})

export const updateUserController = asyncHandler(async (req, res) => {
  const result = await UserService.updateUser(req.user.id, { ...req.body, image: req.file })
  res.status(201).json(
    new ApiResponse(201, result, "Updated user")
  )
})
