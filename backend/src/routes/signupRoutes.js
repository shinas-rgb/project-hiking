import express from "express"
import { changeRole, createUser, getAllUsers, loginUser, passwordChange } from "../controllers/UserAuth.js"
import { protect } from "../middleware/authMiddleware.js"
import { adminOnly } from "../middleware/adminMinddleware.js";

const router = new express.Router()

router.post("/signup", createUser)
router.post("/login", loginUser)
router.put("/profile", passwordChange)
router.get("/users", protect, adminOnly, getAllUsers)
router.put("/role", protect, adminOnly, changeRole)

export default router
