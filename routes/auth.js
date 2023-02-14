import express from "express"
import { registerUser, loginUser } from "../controllers/authController.js"
const router = express.Router()

// User Register route
router.post("/register",registerUser)
// User Login route
router.post("/login",loginUser)

export default router