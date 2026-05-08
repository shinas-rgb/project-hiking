import express from "express"
import { protect } from "../../middleware/authMiddleware.js"
import upload from "../../middleware/multer.js"
import { uploadImageController } from "./upload.controller.js"

const route = express.Router()

route.post('/', protect, upload.array('images', 5), uploadImageController)

export default route
