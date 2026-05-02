import express from 'express'
import { createPlaceController, deletePlaceController, getAllPlacesController, getPlaceByIdController, updatePlaceController } from './place.controller.js'
import { protect } from "../../middleware/authMiddleware.js"

const router = express.Router()

router.get('/', getAllPlacesController)
router.get('/:id', getPlaceByIdController)
router.post('/', protect, createPlaceController)
router.put('/:id', protect, updatePlaceController)
router.delete('/:id', protect, deletePlaceController)

export default router
