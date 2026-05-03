import express from 'express'
import { protect } from "../../middleware/authMiddleware.js"
import { addToBookmarksController, createUserController, getCurrentUserController, loginUserController, removeFromBookmarksController } from './user.controller.js'

const router = express.Router()

router.post('/signup', createUserController)
router.post('/login', loginUserController)
router.get('/', protect, getCurrentUserController)
router.post('/bookmarks/add/:id', protect, addToBookmarksController)
router.post('/bookmarks/remove/:id', protect, removeFromBookmarksController)

export default router
