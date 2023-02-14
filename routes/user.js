import express from "express"
import { verifyToken } from "../verifyToken.js"
import { updateUser, deleteUser, getUser } from "../controllers/userController.js"

const router = express.Router()

// update user
router.put("/:id",verifyToken,updateUser)

// delete user
router.delete("/:id",verifyToken,deleteUser)

// get a user (any)
router.get("/:id",getUser)

export default router