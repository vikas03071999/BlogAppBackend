import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    try {
        const originalPassword = req.body.password
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(originalPassword, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: encryptedPassword
        })
        const newlyCreatedUser = await newUser.save();
        res.status(200).send(newlyCreatedUser)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export const loginUser = async (req, res) => {
    try {
        const userLoggingIn = await User.findOne({ email: req.body.email })
        if (userLoggingIn) {
            let isPasswordCorrect = req.body.password === userLoggingIn.password
            if(!isPasswordCorrect){
               isPasswordCorrect = await bcrypt.compare(req.body.password, userLoggingIn.password)
            }
            if (isPasswordCorrect) {
                const token = jwt.sign({id:userLoggingIn._id},process.env.JWT)
                res.cookie("access_token",token).status(200).send(userLoggingIn)
            }
            else {
                res.status(401).send("Wrong credentials")
            }
        }
        else{
            res.status(401).send(`No user with email: "${req.body.email}" found.`)
        }
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

