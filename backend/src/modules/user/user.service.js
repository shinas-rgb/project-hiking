import mongoose from "mongoose"
import ApiError from "../../utils/ApiError.js"
import User from "./user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Place from "../place/place.model.js"

export const createUser = async (data) => {
  const { name, email, password } = data
  console.log(data)
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required")
  }
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new ApiError(400, "Email already exists")
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = await User.create({ name, email, password: hashedPassword })
  return newUser
}

export const loginUser = async (data) => {
  console.log(data.password)
  const { email, password } = data

  if (!email || !password) {
    throw new ApiError(400, "All fields required")
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new ApiError(401, "User not registerd")
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new ApiError(401, "Incorrect password")
  }

  const token = jwt.sign({
    id: user._id,
    role: user.role
  }, process.env.JWT_SECRET,
    { expiresIn: "7d" })

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      bookmarks: user.bookmarks,
    }
  }
}

export const getCurrentUser = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID")
  }

  const user = await User.findById(userId).select("-password")
  if (!user) {
    throw new ApiError(404, "User not found")
  }
  return user
}

export const addToBookmarks = async (userId, placeId) => {
  if (!userId) {
    throw new ApiError(400, "Not authorized")
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID")
  }

  if (!placeId) {
    throw new ApiError(400, "Place ID is required")
  }

  if (!mongoose.Types.ObjectId.isValid(placeId)) {
    throw new ApiError(400, "Invalid place ID")
  }

  const place = await Place.findById(placeId)
  if (!place) {
    throw new ApiError(404, "Place not found")
  }

  const user = await User.findByIdAndUpdate(userId, {
    $addToSet: { bookmarks: placeId }
  }, { new: true })

  return user
}

export const removeFromBookmarks = async (userId, placeId) => {
  if (!userId) {
    throw new ApiError(400, "Not authorized")
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID")
  }

  if (!placeId) {
    throw new ApiError(400, "Place ID is required")
  }

  if (!mongoose.Types.ObjectId.isValid(placeId)) {
    throw new ApiError(400, "Invalid place ID")
  }

  const place = await Place.findById(placeId)
  if (!place) {
    throw new ApiError(404, "Place not found")
  }

  const user = await User.findByIdAndUpdate(userId, {
    $pull: { bookmarks: placeId }
  }, { new: true })

  return user
}
