import express from "express";
import { createPlace, deletePlace, getPlaceById, getPlaces, updatePlace } from "../controllers/trendingPlaces.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMinddleware.js";

const router = express.Router()

router.get('/', protect, getPlaces)
router.post('/', protect, adminOnly, createPlace)
router.delete('/:id', protect, adminOnly, deletePlace)
router.get('/:id', protect, getPlaceById)
router.put('/:id', protect, adminOnly, updatePlace)

export default router;
