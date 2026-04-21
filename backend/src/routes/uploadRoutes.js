import express from "express"
import upload from "../middleware/multer.js"
import { uploadImage } from "../controllers/uploadController.js"

const router = express.Router()

router.post('/', upload.array('images', 5), uploadImage)

export default router
