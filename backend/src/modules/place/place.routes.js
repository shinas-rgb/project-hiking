import express from 'express'
import { createPlaceController, deletePlaceController, getAllPlacesController, getPlaceByIdController, getPlacesNameController, getPlacesOfUserController, updatePlaceController } from './place.controller.js'
import { protect } from "../../middleware/authMiddleware.js"
import upload from "../../middleware/multer.js"

const router = express.Router()

router.get('/', getAllPlacesController)
router.get('/user', protect, getPlacesOfUserController)
router.get('/titles', getPlacesNameController)
router.get('/:id', getPlaceByIdController)
router.post('/', protect, upload.array('images', 5), createPlaceController)
router.put('/:id', protect, updatePlaceController)
router.delete('/:id', protect, deletePlaceController)

export default router
