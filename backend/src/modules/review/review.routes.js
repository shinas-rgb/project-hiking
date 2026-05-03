import express from 'express'
import { protect } from "../../middleware/authMiddleware.js"
import { createReviewController, getReviewsOfPlaceController } from "./review.controller.js"

const router = express.Router()

router.post('/:id', protect, createReviewController)
router.get('/:id', getReviewsOfPlaceController)

export default router
