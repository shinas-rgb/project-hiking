import express from "express"
import { createUser, loginUser } from "../controllers/UserAuth.js"

const router = new express.Router()

router.post("/signup", createUser)
router.post("/login", loginUser)

export default router
