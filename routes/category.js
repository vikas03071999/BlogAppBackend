import express from "express"
import Category from "../models/Category.js"

const router = express.Router()

router.post("/newCategory",async(req,res)=> {
    try{
        const newCategory = new Category(req.body)
        const newlyCreatedCategory = await newCategory.save()
        res.status(200).send(newlyCreatedCategory)
    }
    catch(err){
        res.status(500).send(err.message)
    }
})

router.get("/allCategories",async(req,res)=>{
    try{
        const allCategories = await Category.find()
        res.status(200).send(allCategories)
    }
    catch(err){
        res.status(500).send(err.message)
    }
})

export default router