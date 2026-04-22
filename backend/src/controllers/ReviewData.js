import Place from "../models/Place.js"
import Review from "../models/Review.js"

export async function getReviewsOfUser(req, res) {
  try {
    const id = req.params.id
    const reviews = await Review.find(
      { userId: id }
    )
    res.status(200).json(reviews)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function getReviewsOfPlace(req, res) {
  try {
    const id = req.params.id
    const reviews = await Review.find(
      { place: id }
    )
    if (reviews.length === 0) return res.status(200).json({ message: "No reviews found" })
    res.status(200).json(reviews)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function createReview(req, res) {
  try {
    const { place, userEmail, userId, rating, review, placeTitle } = req.body
    const newReview = new Review({
      place, userId, userEmail, rating, review, placeTitle
    })
    await newReview.save()

    const reviews = await Review.find({ place })

    let totalRating = 0
    reviews.forEach(r => totalRating += r.rating)
    const avgRating = totalRating / reviews.length
    await Place.findByIdAndUpdate(
      place,
      { rating: avgRating }
    )
    res.status(201).json({ message: "New review created" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function deleteReview(req, res) {
  try {
    const id = req.params.id
    const review = await Review.findByIdAndDelete(id)
    if (!review) return res.status(404).json({ message: "Review not found" })
    res.status(201).json({ message: "Review deleted" })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export const updateReview = async (req, res) => {
  try {
    const id = req.params.id
    const { value } = req.body
    const updateReview = await Review.findByIdAndUpdate(
      id, { $set: { placeTitle: value } },
    )
    res.status(200).json({ message: "Place updated successfully", updateReview })
  } catch (error) {
    res.status(500).send("Internal server error")
  }
}
