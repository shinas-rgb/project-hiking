import Place from "../models/PlaceData.js"

export const getPlaces = async (req, res) => {
  try {
    const notes = await Place.find().sort({ createdAt: -1 })
    res.status(200).json(notes)
  } catch (error) {
    console.error("Error fetching places")
    res.status(500).json({ message: "error" })
  }
}

export const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id)
    if (!place) return res.status(404).json({ message: "Place not found" })
    res.status(200).json(place)
  } catch (error) {
    res.status(500).json({ message: "error" })
  }
}

export const createPlace = async (req, res) => {
  try {
    const { title, content, link } = req.body
    const newPlace = new Place({ title, content, link })

    await newPlace.save()
    res.status(201).json({ message: "Note created" })
  } catch (error) {
    res.status(500).send("Internal server error")
  }
}

export const updatePlace = async (req, res) => {
  try {
    const { title, content, link } = req.body
    const updatePlace = await Place.findByIdAndUpdate(
      req.params.id,
      { title, content, link },
      {
        new: true,
      }
    )
    if (!updatePlace) return res.status(404).json({ message: "Place not found" })
    res.status(200).json({ message: "Place updated successfully", updatePlace })
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
    const search = req.query.search || ""
    const places = await Place.find({
      title: {
        $regex: search,
        $options: "i"
      }
    })
    res.status(200).json(places)
  } catch (error) {
    res.status(500).send("Internal server error")
  }
}
