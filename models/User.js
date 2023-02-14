import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 5,
        required: true
    },
    displayPicture: {
        type: String,
        default: ""
    },
    aboutMe: {
        type: String,
        default: ""
    }
},
{
    timestamps:true
})

export default mongoose.model("User",UserSchema)