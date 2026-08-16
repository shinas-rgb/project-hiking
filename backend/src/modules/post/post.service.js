import mongoose from "mongoose"
import ApiError from "../../utils/ApiError.js"
import Post from "./post.model.js"
import { uploadImage } from "../images/upload.service.js"

export const getAllPosts = async (limit, cursor) => {
  console.log("Here...")
  console.log("cursor: ")
  console.log(cursor)
  console.log("limit: ")
  console.log(limit)
  const query = {}

  if(cursor) {
    const cursorPost = await Post.findById(cursor)

    if(!cursorPost) {
      throw new ApiError(400, "Invalid cursor error")
    }

    query.$or = [
      { createdAt: { $lt: cursorPost.createdAt } },
      {
        createdAt: cursorPost.createdAt,
        _id: { $lt: cursorPost._id }
      }
    ]

  }

  const posts = await Post.find(query)
  .populate("author", "_id name image")
  .populate("place", "_id title")
  .sort({createdAt: -1, _id: -1})
  .limit(limit + 1)
  .lean()

  const hasMore = posts.length > limit

  if(hasMore) {
    posts.pop()
  }

  const nextCursor = hasMore
  ? posts[posts.length - 1]._id
  : null

  return {
    posts,
    hasMore,
    nextCursor
  }
}

export const createPost = async (userId, data) => {
  if (!userId) {
    throw new ApiError(400, "User not authenticated")
  }

  if (data.placeId && !mongoose.Types.ObjectId.isValid(data.placeId)) {
    throw new ApiError(400, "Invalid place ID")
  }

  if(!data.images || data.images.length < 1) {
    throw new ApiError(400, "Atleast one image is necessary")
  }

  const uploadedImages = await uploadImage(data.images)

  const postData = {
    author: userId,
    description: data.description,
    images: uploadedImages,
    place: data.placeId,
  }
  const newPost = await Post.create(postData)
  return newPost
}

export const deletePost = async (userId, postId) => {
  if (!userId) {
    throw new ApiError(400, "User not authenticated")
  }

  if(!postId) {
    throw new ApiError(400, "Post ID required")
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid place ID")
  }

  const deletedPost = await Post.findByIdAndDelete(postId)

  if(!deletePost) {
    throw new ApiError(404, "Post not found")
  }

  return deletedPost
}