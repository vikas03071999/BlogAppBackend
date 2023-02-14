import express from "express"
import { verifyToken } from "../verifyToken.js"
import { createNewPost, deletePost, getAllPosts, getPost, updatePost } from "../controllers/postController.js"

const router = express.Router()


router.post("/newPost",verifyToken,createNewPost)
router.put("/updatePost/:id",verifyToken,updatePost)
router.delete("/deletePost/:id",verifyToken,deletePost)
router.get("/getPost/:id",getPost)
router.get("/getAllPosts",getAllPosts)




export default router