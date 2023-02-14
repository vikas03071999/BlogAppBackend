import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    categories: {
        type: Array
    }
},
{
    timestamps: true
})

export default mongoose.model("Post",PostSchema)