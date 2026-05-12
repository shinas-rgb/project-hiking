import mongoose from "mongoose"
import Place from "./place.model.js"
import ApiError from "../../utils/ApiError.js"
import User from "../user/user.model.js"

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

  if (!userId) {
    throw new ApiError(401, "User not authenticated")
  }
  if (!data.description) {
    throw new ApiError(400, "Description of place is required")
  }
  if (!Array.isArray(data.images) || data.images.length === 0) {
    throw new ApiError(400, "Atleast one image is required")
  }
  if (data.duration == null) {
    throw new ApiError(400, "Duration is required")
  }
  if (data.distance == null) {
    throw new ApiError(400, "Distance is required")
  }

  const placeData = {
    ...data,
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
      rating: place.rating
    }
  }
}

export const updatePlace = async (data, placeId, userId) => {
  console.log(data, placeId, userId)
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
