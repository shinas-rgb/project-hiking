import mongoose from "mongoose"
import ApiError from "../../utils/ApiError.js"
import User from "./user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Place from "../place/place.model.js"
import { uploadImage } from "../images/upload.service.js"
import Review from "../review/review.model.js"

export const createUser = async (data) => {
  const { name, email, password } = data
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
    { expiresIn: "1y" })

  return {
    token,
    user: {
      _id: user._id,
      name: user.name || "user",
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
  return {
    user: {
      _id: user._id,
      name: user.name || "user",
      email: user.email,
      role: user.role,
      bookmarks: user.bookmarks,
      image: user.image || {url: "https://res.cloudinary.com/dyqumsdla/image/upload/v1786527430/hike_uploads/uo37wvuqsquyasoh6m0w.jpg" },
      bio: user.bio,
    followings: user.followings || 0,
    followers: user.followers || 0,
    totalFollowers: user.followers.length || 0,
    totalFollowings: user.followings.length || 0,
    }
  }
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

export const updateUser = async (userId, data) => {
  if (!userId) {
    throw new ApiError(400, "Not authorized")
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID")
  }

  if(!data.name) {
    throw new ApiError(400, "Name required")
  }

  if(!data.bio) {
    throw new ApiError(400, "Bio required")
  }


  const user = await User.findById(userId)
  user.name = data.name;
  user.bio = data.bio;

  if (data.image) {
    const uploadedImage = await uploadImage(data.image);
    user.image = uploadedImage;
  }

  if(!data.pfp) {
    user.image = { url: "https://res.cloudinary.com/dyqumsdla/image/upload/v1786527430/hike_uploads/uo37wvuqsquyasoh6m0w.jpg", }
  }

  await user.save()

  return user;
}

export const getSingleUser = async (userId) => {
  if (!userId) {
    throw new ApiError(400, "User id needed")
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID")
  }

  const user = await User.findById(userId)
  if (!user) {
    throw new ApiError(404, "User not found")
  }

  return {
    user: {
      _id: user._id,
      name: user.name || "User",
      image: user.image,
    }
  }
}

export const getUserProfile = async (userId) => {
  if (!userId) {
    throw new ApiError(400, "User id needed")
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID")
  }

  const user = await User.findById(userId)
  if (!user) {
    throw new ApiError(404, "User not found")
  }

    // if(!user.image.url){
    //   user.image = defaultImg
    // }

  const filteredUser = {
    email: user.email,
    name: user.name || "User",
    bio: user.bio || "",
    image: user.image,
    followers: user.followers,
    followings: user.followings,
    totalFollowers: user.followers.length || 0,
    totalFollowings: user.followings.length || 0, 
  }

  const reviews = await Review.find({ userId })
  const filteredReviews = reviews.map(({_id, place, placeName, rating, review}) => ({
    _id,
    place,
    placeName,
    rating,
    review
  }))

  const places = await Place.find({createdBy: userId})
  const filteredPlaces = places.map((item) => ({
    _id: item._id,
    title: item.title,
    rating: item.rating,
  }))

  return {
    filteredUser,
    filteredReviews,
    filteredPlaces,
  }
}

export const followUser = async (userId, targetId) => {
  if (!userId) {
    throw new ApiError(400, "User id needed")
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID")
  }

  if (!targetId) {
    throw new ApiError(400, "Target id needed")
  }

  if (!mongoose.Types.ObjectId.isValid(targetId)) {
    throw new ApiError(400, "Invalid target ID")
  }

  const user = await User.findById(userId)
  if (!user) {
    throw new ApiError(404, "User not found")
  }

  const targetUser = await User.findById(targetId)
  if (!targetUser) {
    throw new ApiError(404, "Target not found")
  }

  user.followings.addToSet({
    _id: targetId,
    name: targetUser.name ?? "User",
    image: targetUser.image 
  })

  targetUser.followers.addToSet({
    _id: userId,
    name: user.name ?? "User",
    image: user.image 
  })


  await user.save()
  await targetUser.save()

  return {
    user: {
      _id: user._id,
      name: user.name || "User",
      image: user.image,
      followings: user.followings || 0,
      followers: user.followers || 0,
      totalFollowers: user.followers.length || 0,
      totalFollowings: user.followings.length || 0,
    },
    targetUser: {
      _id: targetUser._id,
      name: targetUser.name || "User",
      image: targetUser.image,
      followings: targetUser.followings || 0,
      followers: targetUser.followers || 0,
      totalFollowers: targetUser.followers.length || 0,
      totalFollowings: targetUser.followings.length || 0,
    }
  }

}

export const unfollowUser = async (userId, targetId) => {
  if (!userId) {
    throw new ApiError(400, "User id needed")
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID")
  }

  if (!targetId) {
    throw new ApiError(400, "Target id needed")
  }

  if (!mongoose.Types.ObjectId.isValid(targetId)) {
    throw new ApiError(400, "Invalid target ID")
  }

  // const user = await User.findByIdAndUpdate(
  //   userId,
  //   {$pull: {followings: targetId}},
  //   {new: true}
  // )
  // if (!user) {
  //   throw new ApiError(404, "User not found")
  // }

  // const targetUser = await User.findByIdAndUpdate(
  //   targetId,
  //   {$pull: {followers: userId}},
  //   {new: true}
  // )
  // if (!targetUser) {
  //   throw new ApiError(404, "Target not found")
  // }

  const user = await User.findById(userId)
  if (!user) {
    throw new ApiError(404, "User not found")
  }

  const targetUser = await User.findById(targetId)
  if (!targetUser) {
    throw new ApiError(404, "Target not found")
  }

  user.followings.pull({
    _id: targetId
  })

  targetUser.followers.pull({
    _id: userId
  })

  await user.save()
  await targetUser.save()
  return {
    user: {
      _id: user._id,
      name: user.name || "User",
      image: user.image,
      followings: user.followings,
      followers: user.followers,
      totalFollowers: user.followers.length || 0,
      totalFollowings: user.followings.length || 0,
    },
    targetUser: {
      _id: targetUser._id,
      name: targetUser.name || "User",
      image: targetUser.image,
      followings: targetUser.followings,
      followers: targetUser.followers,
      totalFollowers: targetUser.followers.length || 0,
      totalFollowings: targetUser.followings.length || 0,
    }
  }
}