import multer from 'multer'
import express from 'express'

const router = express.Router()

// Code for uploading images
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"images")
    },
    filename: (req,file,cb) => {
        cb(null,req.body.name)
    }
})
const upload = multer({storage:storage})

router.post("/",upload.single("file"),(req,res)=>{
    res.status(200).send("Picture uploaded successfully")
})

export default router

