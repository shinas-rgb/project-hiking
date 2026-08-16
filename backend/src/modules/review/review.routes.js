import express from 'express'
import { protect } from "../../middleware/authMiddleware.js"
import { createReviewController, deleteReviewController, getAllReviewsController, getReviewsOfPlaceController, getReviewsOfUserController } from "./review.controller.js"

const router = express.Router()

router.get('/all', getAllReviewsController)
router.post('/:id', protect, createReviewController)
router.get('/:id', getReviewsOfPlaceController)
router.get('/', protect, getReviewsOfUserController)
router.delete('/:id', protect, deleteReviewController)

export default router
