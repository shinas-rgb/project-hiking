import Place from "../models/Place.js"
import User from "../models/User.js"

export const getPlaces = async (req, res) => {
  try {
    const notes = await Place.find().sort({ createdAt: -1 })
    res.status(200).json(notes)
  } catch (error) {
    console.error("Error fetching places")
    res.status(500).json({ message: error.message })
  }
}

export const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id)
    if (!place) return res.status(404).json({ message: "Place not found" })
    res.status(200).json(place)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createPlace = async (req, res) => {
  try {
    const { title, description, images, features, location, difficulty, bestSeason,
      season, bestTime, route, tips, duration, distance, trending, createdBy, rating } = req.body
    const newPlace = new Place({
      title, description, features, images, location, difficulty, bestSeason,
      season, bestTime, route, tips, duration, distance, trending, createdBy, rating
    })

    await newPlace.save()
    res.status(201).json({ message: "New Place created" })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export const updatePlace = async (req, res) => {
  try {
    const { id, title, description, images, features, location, difficulty, bestSeason,
      season, bestTime, route, tips, duration, distance } = req.body

    const updatedPlace = await Place.findByIdAndUpdate(id, {
      title, description, images, features, location, difficulty, bestSeason,
      season, bestTime, route, tips, duration, distance
    }, { new: true })
    res.status(200).json({ message: "Place updated successfully", updatedPlace })
  } catch (error) {
    res.status(500).send("Internal server error")
  }
}

export async function deletePlace(req, res) {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.id)
    if (!deletedPlace) return res.status(400).json({ message: "Place not found" })
    res.status(200).json({ message: "Place deleted" })
  } catch (error) {
    res.status(500).send("Internal server error")
  }
}

// Search Function 
export async function searchPlace(req, res) {
  try {
    const { id, q, district, trending, bookmarks, createdBy, difficulty, bestSeason, hDuration, lDuration, hDistance, lDistance,
      lat, lon, within, duration, distance } = req.query

    let query = {}

    if (q) query.title = {
      $regex: q,
      $options: "i"
    }
    if (difficulty) query.difficulty = {
      $regex: difficulty,
      $options: "i"
    }
    if (bestSeason) query.bestSeason = {
      $regex: bestSeason,
      $options: "i"
    }
    if (hDuration || lDuration) {
      query.duration = {}
      if (lDuration) query.duration.$gte = lDuration
      if (hDuration) query.duration.$lte = hDuration
    }
    if (hDistance || lDistance) {
      query.distance = {}
      if (lDistance) query.distance.$gte = lDistance
      if (hDistance) query.distance.$lte = hDistance
    }
    if (trending) query.trending = trending === 'true' ? true : false
    if (district) query.description = {
      $regex: district,
      $options: "i"
    }

    if (lon && lat && within) query.location = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lon, lat]
        },
        $maxDistance: Number(within) * 1000
      }
    }

    if (createdBy) query.createdBy = createdBy

    if (bookmarks) {
      const user = await User.findById(id)
      const places = await Place.find({
        _id: { $in: user.bookmarks }
      })
      return res.status(200).json({ places })
    }

    if (duration) {
      const places = await Place.find().sort({ duration: Number(duration) })
      return res.status(200).json({ places })
    }

    if (distance) {
      const places = await Place.find().sort({ distance: Number(distance) })
      return res.status(200).json({ places })
    }

    const places = await Place.find(query)
    res.status(200).json({ places, trending })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}
