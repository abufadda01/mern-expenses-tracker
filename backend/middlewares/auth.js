const jwt = require("jsonwebtoken")
const createError = require("../utils/createError")
const User = require("../models/User")


const auth = async (req , res , next) => {

    let token 

    try {
        
        if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")){
            return next(createError("Not authorized" , 401))
        }

        token = req.headers.authorization.split(" ")[1]

        jwt.verify(token , process.env.JWT_SECRET , async (err , decodedToken) => {

            if(err){
                return next(createError("Access Forbidden" , 403)) 
            }

            req.user = await User.findById(decodedToken.userId).select("-password")

            next()
        
        })

    } catch (error) {
        next(error)
    }

}









module.exports = auth