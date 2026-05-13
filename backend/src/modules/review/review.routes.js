import express from 'express'
import { protect } from "../../middleware/authMiddleware.js"
import { createReviewController, getReviewsOfPlaceController, getReviewsOfUserController } from "./review.controller.js"

const router = express.Router()

router.post('/:id', protect, createReviewController)
router.get('/:id', getReviewsOfPlaceController)
router.get('/', protect, getReviewsOfUserController)

export default router
