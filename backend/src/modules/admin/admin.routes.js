import express from "express"
import { getAllPlacesController, getAllUsersController } from "./admin.controller.js"
import { adminOnly } from "../../middleware/adminMinddleware.js"
import { protect } from "../../middleware/authMiddleware.js"

const route = express.Router()

route.get('/users', protect, adminOnly, getAllUsersController)
route.get('/places', protect, adminOnly, getAllPlacesController)

export default route
