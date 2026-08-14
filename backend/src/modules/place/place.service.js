import mongoose from "mongoose"
import Place from "./place.model.js"
import ApiError from "../../utils/ApiError.js"
import User from "../user/user.model.js"
import { uploadImage } from "../images/upload.service.js"
import Review from "../review/review.model.js"
import { getReviewsOfPlace } from "../review/review.service.js"
import { getSingleUser } from "../user/user.service.js"

export const getAllPlaces = async (query, userId) => {
  const page = Number(query.page) || 1
  const limit = Math.min(Number(query.limit) || 10, 50)

  const filter = {}
  const sort = {}


  if (query.q && query.q.trim().length > 2) filter.title = {
    $regex: query.q.trim(),
    $options: "i"
  }

  if (query.trending) {
    if (query.trending === 'true') filter.trending = true
    if (query.trending === 'false') filter.trending = false
  }

  if (query.difficulty) filter.difficulty = query.difficulty
  if (query.bestSeason) filter.bestSeason = query.bestSeason

  if (query.hDuration || query.lDuration) {
    query.duration = {}
    if (query.lDuration) filter.duration.$gte = query.lDuration
    if (query.hDuration) filter.duration.$lte = query.hDuration
  }
  if (query.hDistance || query.lDistance) {
    query.distance = {}
    if (query.lDistance) filter.distance.$gte = query.lDistance
    if (query.hDistance) filter.distance.$lte = query.hDistance
  }

  if (query.lon && query.lat && query.within) filter.location = {
    $near: {
      $geometry: {
        type: 'Point',
        coordinates: [lon, lat]
      },
      $maxDistance: Number(within) * 1000
    }
  }

  if (query.distance) {
    const distanceSort = Number(query.distance)
    if (distanceSort === 1 || distanceSort === -1) {
      sort.distance = distanceSort
    }
  }

  if (query.duration) {
    const durationSort = Number(query.duration)
    if (durationSort === 1 || durationSort === -1) {
      sort.duration = durationSort
    }
  }

  if (!query.distance && !query.duration) {
    sort.rating = -1
  }

  if (query.district) {
    filter.description = {
      $regex: query.district,
      $options: "i"
    }
  }

  const places = await Place.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)

  const total = await Place.countDocuments(filter)

  return {
    places,
    page,
    totalPages: Math.ceil(total / limit),
    totalItmes: total
  }
}

export const createPlace = async (data, userId) => {
  if (!data.title) {
    throw new ApiError(400, "Title is required")
  }

  if (!data.description) {
    throw new ApiError(400, "Description is required")
  }

  if (data.lon == null || data.lat == null ||
    data.lon === "" || data.lat === "") {
    throw new ApiError(400, "Coordinates are required")
  }

  const lng = Number(data.lon)
  const lat = Number(data.lat)

  if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
    throw new ApiError(
      400, "Coordinates must be valid numbers"
    );
  }

  if (lng > 180 || lng < -180 || lat > 90 || lat < -90) {
    throw new ApiError(400, "Invalid coordinate range")
  }

  if (!userId) {
    throw new ApiError(401, "User not authenticated")
  }
  if (!data.description) {
    throw new ApiError(400, "Description of place is required")
  }
  if (!Array.isArray(data.images) || data.images.length === 0) {
    throw new ApiError(400, "Atleast one image is required")
  }
  if (!data.duration) {
    throw new ApiError(400, "Duration is required")
  }
  if (!data.distance) {
    throw new ApiError(400, "Distance is required")
  }

  const duration = Number(data.duration)
  const distance = Number(data.distance)

  if (!Number.isFinite(duration)) {
    throw new ApiError(
      400, "Duration must be a valid number"
    );
  }

  if (!Number.isFinite(distance)) {
    throw new ApiError(
      400, "Distance must be a valid number"
    );
  }

  const difficulty = JSON.parse(data.difficulty || "[]");
  const bestSeason = JSON.parse(data.bestSeason || "[]");
  const tips = JSON.parse(data.tips || "[]");
  const features = JSON.parse(data.features || "[]");

  if (bestSeason.length < 1) {
    throw new ApiError(
      400, "Select atleast one season"
    );
  }

  if (difficulty.length < 1) {
    throw new ApiError(
      400, "Select atleast one difficulty"
    );
  }

  const uploadedImages = await uploadImage(data.images);

  const placeData = {
    title: data.title,
    description: data.description,
    images: uploadedImages,
    location: {
      type: "Point",
      coordinates: [lng, lat]
    },
    difficulty: difficulty,
    bestSeason: bestSeason,
    season: data.season,
    bestTime: data.time,
    route: data.route,
    tips: tips,
    features: features,
    duration: duration,
    distance: distance,
    createdBy: userId
  }
  const newPlace = await Place.create(placeData)

  return newPlace
}

export const getPlaceById = async (placeID) => {
  if (!placeID) {
    throw new ApiError(400, "ID of place is required")
  }

  if (!mongoose.Types.ObjectId.isValid(placeID)) {
    throw new ApiError(400, "Invalid place ID")
  }

  const place = await Place.findById(placeID)

  if (!place) {
    throw new ApiError(404, "Place not found")
  }

  const reviews = await getReviewsOfPlace(placeID)
  const createdUser = await getSingleUser(place.createdBy)

  return {
    place: {
      _id: place._id,
      title: place.title,
      description: place.description,
      features: place.features,
      images: place.images,
      location: place.location,
      difficulty: place.difficulty,
      bestSeason: place.bestSeason,
      season: place.season,
      bestTime: place.bestTime,
      route: place.route,
      tips: place.tips,
      duration: place.duration,
      distance: place.distance,
      rating: place.rating,
      createdBy: place.createdBy,
    },
    reviews,
    createdUser
  }
}

export const updatePlace = async (data, placeId, userId) => {
  if (!placeId) {
    throw new ApiError(400, "ID of place is required")
  }

  if (!mongoose.Types.ObjectId.isValid(placeId)) {
    throw new ApiError(400, "Invalid place ID")
  }

  const place = await Place.findById(placeId)

  if (!place) {
    throw new ApiError(404, "Place not found")
  }

  if (!userId) {
    throw new ApiError(401, "User not authenticated")
  }

  if (!place.createdBy || place.createdBy.toString() !== userId.toString()) {
    throw new ApiError(403, "Not authorized")
  }

  const allowedFields = [
    "title",
    "description",
    "images",
    "location",
    "duration",
    "distance",
    "route",
    "season",
    "bestSeason",
    "bestTime",
    "tips",
    "features"
  ]

  const updateData = {}

  for (const key of allowedFields) {
    if (data[key] !== undefined) {
      updateData[key] = data[key]
    }
  }

  if (updateData.location) {

    if (!data.location || !data.location.coordinates) {
      throw new ApiError(400, "valid location is required")
    }
    if (data.location.coordinates.length !== 2) {
      throw new ApiError(400, "Coordinates must be [lng, lat]")
    }

    const [lng, lat] = data.location.coordinates

    if (lng > 180 || lng < -180 || lat > 90 || lat < -90) {
      throw new ApiError(400, "Invalid coordinate range")
    }
  }

  Object.assign(place, updateData)

  await place.save()

  return place
}

export const deletePlace = async (placeId, userId) => {
  if (!userId) {
    throw new ApiError(401, "User not authenticated")
  }

  if (!placeId) {
    throw new ApiError(400, "Place ID is required")
  }

  if (!mongoose.Types.ObjectId(placeId).isValid()) {
    throw new ApiError(400, "Invalid place ID")
  }

  const place = await Place.findById(placeId)
  if (!place) {
    throw new ApiError(404, "Place not found")
  }

  if (place.createdBy.toString() !== userId.toString()) {
    throw new ApiError(403, "User not authorized")
  }

  const deletedPlace = await Place.findByIdAndDelete(placeId)

  // const deletedPlace = await Place.findOneAndDelete({
  //   _id: placeId,
  //   createdBy: userId
  // })
  //
  // if (!deletedPlace) {
  //   throw new Error("Not found or not authorized")
  // }

  return deletedPlace
}

export const getPlacesOfUser = async (userId) => {
  if (!userId) {
    throw new ApiError(401, "User not authenticated")
  }
  const places = await Place.find({ createdBy: userId })
  return places
}
