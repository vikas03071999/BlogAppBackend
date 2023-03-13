import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import AuthRouter from "./routes/auth.js"
import UserRouter from "./routes/user.js"
import PostRouter from './routes/post.js'
import CategoryRouter from './routes/category.js'
import UploadRouter from './routes/upload.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000
const app = express();

dotenv.config()
// app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("connected to mongodb"))
    .catch((err) => console.log(err))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://blog-app-vo-ne.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use("/api/uploadfile/", UploadRouter)
app.use("/api/auth/", AuthRouter)
app.use("/api/user/", UserRouter)
app.use("/api/post/", PostRouter)
app.use("/api/category/", CategoryRouter)

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})