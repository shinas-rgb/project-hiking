import express from 'express'
import { protect } from "../../middleware/authMiddleware.js"
import { createReviewController, deleteReviewController, getReviewsOfPlaceController, getReviewsOfUserController } from "./review.controller.js"

const router = express.Router()

router.post('/:id', protect, createReviewController)
router.get('/:id', getReviewsOfPlaceController)
router.get('/', protect, getReviewsOfUserController)
router.delete('/:id', protect, deleteReviewController)

export default router
