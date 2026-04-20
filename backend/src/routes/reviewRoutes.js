import express from "express"
import { createReview, deleteReview, updateReview, getReviewsOfPlace, getReviewsOfUser } from "../controllers/ReviewData.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get('/place/:id', getReviewsOfPlace)
router.get('/user/:id', protect, getReviewsOfUser)
router.post('/', protect, createReview)
router.delete('/:id', protect, deleteReview)
router.put('/:id', updateReview)

export default router
