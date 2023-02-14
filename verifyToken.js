import jwt from "jsonwebtoken"

export const verifyToken = async(req,res,next) => {
    const token = req.cookies.access_token
    // console.log(token)

    if(!token){
        res.status(401).send("You are not authenticated")
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            res.status(401).send("Wrong user")
        }
        // console.log(user)
        req.user = user
        next()
    })
}