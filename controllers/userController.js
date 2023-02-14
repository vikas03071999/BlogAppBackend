import User from "../models/User.js"
import bcrypt from "bcrypt"


export const updateUser = async(req,res) => {
    if(req.user.id === req.params.id){
        try{
            const userInfoInDatabase = await User.findById(req.params.id)
            // We should find a way to know which data a user is updating
            const newEncryptedPassword = ""
            if(req.body.password){
                const salt = await bcrypt.genSalt(10)
                newEncryptedPassword = await bcrypt.hash(req.body.password,salt)
            }
            userInfoInDatabase.username = req.body.username ? req.body.username : userInfoInDatabase.username
            userInfoInDatabase.email = req.body.email ? req.body.email : userInfoInDatabase.email
            userInfoInDatabase.password = req.body.password ? newEncryptedPassword : userInfoInDatabase.password
            userInfoInDatabase.displayPicture = req.body.displayPicture ? req.body.displayPicture : "" 

            const updatedUser = await userInfoInDatabase.save()
            res.status(200).send(updatedUser)
        }
        catch(err){
            res.status(500).send(err.message)
        }
    }
    else{
        res.status(403).send("You cannot update any other person's account")
    }
}

export const deleteUser = async(req,res) => {
    if(req.user.id === req.params.id){
        try{
            const deletedUser = await User.findByIdAndDelete(req.params.id)
            res.status(201).send(deletedUser)
        }
        catch(err){
            res.status(500).send(err.message)
        }
    }
    else{
        res.status(403).send("You cannot delete any other person's account")
    }
}

export const getUser = async(req,res) => {
    try{
        const requestedUser = await User.findById(req.params.id)
        if(requestedUser){
            res.status(201).send(requestedUser)
        }
        else{
            res.status(403).send("User not found")
        }
    }
    catch(err){
        res.status(500).send(err.message)
    }
}