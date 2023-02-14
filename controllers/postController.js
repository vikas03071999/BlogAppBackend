import Post from "../models/Post.js"


export const createNewPost = async(req,res) => {
    try{
        const newPost = new Post({
            userId: req.user.id,
            ...req.body
        })
        const newlyCreatedPost = await newPost.save()
        res.status(200).send(newlyCreatedPost)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

export const updatePost = async(req,res) => {
    try{
        const postToBeUpdated = await Post.findById(req.params.id)
        if(postToBeUpdated.userId === req.user.id){
            postToBeUpdated.title = req.body.title ? req.body.title : postToBeUpdated.title
            postToBeUpdated.description = req.body.description ? req.body.description : postToBeUpdated.description
            postToBeUpdated.photo = req.body.photo ? req.body.photo : postToBeUpdated.photo
            postToBeUpdated.categories = req.body.categories ? req.body.categories : postToBeUpdated.categories
            const updatedPost = await postToBeUpdated.save()
            res.status(201).send(updatedPost)  
        }
        else{
            res.status(403).send("You are authenticated to update your post only")
        }
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

export const deletePost = async(req,res) => {
    try{
        const postToBeDeleted = await Post.findById(req.params.id)
        // Check if the post belongs to the logged in user
        if(req.user.id === postToBeDeleted.userId){
            const deletedPost = await Post.findByIdAndDelete(req.params.id)
            res.status(200).send(deletedPost)
        }
        else{
            res.status(401).send("You can delete your posts only")
        }
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

export const getPost = async(req,res) => {
    try{
        const postRequested = await Post.findById(req.params.id)
        res.status(200).send(postRequested)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

export const getAllPosts = async(req,res) => {
    try{
        const username = req.query.userId
        const category = req.query.category
        let allPosts
        if(username && category){
            allPosts = await Post.find({username:username,categories:{$in:[category]}})
        }
        else if(username){  
            allPosts = await Post.find({username:username})
        }
        else if(category){
            allPosts = await Post.find({
                categories:{
                    $in:[category]
                }
            })
        }
        else{
            allPosts = await Post.find().sort({updatedAt:-1})
        }
        res.status(200).send(allPosts)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}