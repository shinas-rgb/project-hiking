import * as postService from "./post.service.js"
import ApiResponse from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"

export const getAllPostsController = asyncHandler(async (req, res) => {
  const {limit, cursor} = req.query
  const result = await postService.getAllPosts(Math.min((Number(limit)) || 20, 50), cursor)
  res.status(200).json(
    new ApiResponse(200, result, "Posts fetched")
  )
})

export const createPostController = asyncHandler(async (req, res) => {
  const result = await postService.createPost(req.user.id, {...req.body, images: req.files})
  res.status(201).json(
    new ApiResponse(201, result, "Post created")
  )
})

export const deletedPlaceController = asyncHandler(async (req, res) => {
  const result = await postService.deletePost(req.user.id, req.params.id)
  res.status(201).json(
    new ApiResponse(201, result, "Post deleted")
  )
})

export const getPostsOfUserController = asyncHandler(async (req, res) => {
  const {userId, limit, cursor} = req.query
  const result = await postService.getPostsOfUser(userId, Math.min((Number(limit)) || 20, 50), cursor)
  res.status(200).json(
    new ApiResponse(200, result, "Posts fetched")
  )
})

export const likePostController = asyncHandler(async (req, res) => {
  const result = await postService.likePost(req.user.id, req.params.id)
  res.status(201).json(
    new ApiResponse(201, result, "Liked post")
  )
})

export const unLikePostController = asyncHandler(async (req, res) => {
  const result = await postService.unLikePost(req.user.id, req.params.id)
  res.status(201).json(
    new ApiResponse(201, result, "Unliked post")
  )
})
