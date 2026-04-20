import express from "express";
import { createPlace, deletePlace, getPlaceById, getPlaces, searchPlace, updatePlace } from "../controllers/PlaceData.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMinddleware.js";

const router = express.Router()

router.get('/', getPlaces)
router.get('/search', searchPlace)
router.post('/', protect, createPlace)
router.delete('/:id', protect, adminOnly, deletePlace)
router.get('/:id', getPlaceById)
router.put('/', protect, updatePlace)

export default router;
