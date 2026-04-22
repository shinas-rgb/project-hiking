import express from "express"
import { changeRole, createUser, getAllUsers, loginUser, deleteUser, getUserById, passwordChange, deleteAccount, addToBookmarks, removeFromBookmarks } from "../controllers/UserAuth.js"
import { protect } from "../middleware/authMiddleware.js"
import { adminOnly } from "../middleware/adminMinddleware.js";

const router = new express.Router()

router.post("/signup", createUser)
router.post("/login", loginUser)
router.put("/profile", passwordChange)
router.get("/users", protect, adminOnly, getAllUsers)
router.get("/user/:id", protect, adminOnly, getUserById)
router.put("/role", protect, adminOnly, changeRole)
router.delete("/", protect, deleteAccount)
router.delete("/account", protect, adminOnly, deleteUser)
router.post('/bookmarks/:placeId', protect, addToBookmarks)
router.delete('/bookmarks/:placeId', protect, removeFromBookmarks)

export default router
