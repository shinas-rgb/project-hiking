import express from 'express'
import { protect } from "../../middleware/authMiddleware.js"
import { addToBookmarksController, createUserController, updateUserController, getCurrentUserController, loginUserController, removeFromBookmarksController, getSingleUserController, getUserProfileController, followuserController, unfollowuserController } from './user.controller.js'
import upload from '../../middleware/multer.js'

const router = express.Router()

router.post('/signup', createUserController)
router.post('/login', loginUserController)
router.get('/', protect, getCurrentUserController)
router.post('/bookmarks/add/:id', protect, addToBookmarksController)
router.post('/bookmarks/remove/:id', protect, removeFromBookmarksController)
router.put('/', protect, upload.single("image"), updateUserController)
router.get('/user/:id', getSingleUserController)
router.get('/user/profile/:id', getUserProfileController)
router.post('/follow/:id', protect, followuserController)
router.delete('/unfollow/:id', protect, unfollowuserController)

export default router
