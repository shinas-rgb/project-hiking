import express from 'express'
import { protect } from "../../middleware/authMiddleware.js"
import upload from "../../middleware/multer.js"
import {createPostController, deletedPlaceController, getAllPostsController, getPostsOfUserController} from "./post.controller.js"

const router = express.Router()

router.get('/', getAllPostsController)
router.get('/user', protect, getPostsOfUserController)
router.post('/', protect,upload.array('images', 5), createPostController)
router.delete('/:id', protect, deletedPlaceController)

export default router