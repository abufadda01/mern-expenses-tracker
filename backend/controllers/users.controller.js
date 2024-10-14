const Joi = require("joi")
const createError = require("../utils/createError")
const User = require("../models/User")



const register = async (req , res , next) => {

    const registerSchema = Joi.object({
        username : Joi.string().required() ,
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })

    const {value , error} = registerSchema.validate(req.body , {abortEarly : false})

    if(error){
        return next(createError("Invalid credentials" , 400))
    }

    try {
        
        const {username , email , password} = value

        const isUserExist = await User.findOne({email})

        if(isUserExist){
            return next(createError("User already exist" , 400))
        }

        const newUser = new User({
            username ,
            email ,
            password
        })

        await newUser.save()

        newUser.password = undefined

        res.status(201).json(newUser)

    } catch (error) {
        next(error)
    }

}




const login = async (req , res , next) => {

    
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })

    const {value , error} = loginSchema.validate(req.body , {abortEarly : false})

    if(error){
        return next(createError("Invalid credentials" , 400))
    }

    try {
        
        const {email , password} = value

        const user = await User.findOne({email})

        if(!user){
            return next(createError("Invalid Credentials" , 400))
        }

        const isPasswordMatched = await user.comparePassword(password , user.password)

        if(!isPasswordMatched){
            return next(createError("Invalid Credentials" , 400))
        }

        const token = user.signJWT()

        user.password = undefined

        res.status(200).json({user , token})

    } catch (error) {
        next(error)
    }

}




const getUser = async (req , res , next) => {
    try {
    
        const user = await User.findById(req.user._id)
    
        if(!user){
            return next(createError("User not found" , 404))
        } 
        
        user.password = undefined

        res.status(200).json(user)
    
    } catch (error) {
        next(error)
    }
}




const changePassword = async (req , res , next) => {

    const {newPassword} = req.body

    try {
        
        const user = await User.findById(req.user._id)
    
        if(!user){
            return next(createError("User not found" , 404))
        }
        
        if(!newPassword || newPassword.length < 8){
            return next(createError("Invalid new password value" , 400))
        }

        user.password = newPassword

        await user.save()

        user.password = undefined

        res.status(200).json({msg : "password updated successfully"})
    
    } catch (error) {
        next(error)
    }

}




const updateProfile = async (req , res , next) => {

    const updateProfileSchema = Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().required(),
    })

    const {value , error} = updateProfileSchema.validate(req.body , {abortEarly : false})

    if(error){
        return next(createError("Invalid credentials" , 400))
    }

    try {
        
        const {username , email} = value

        const user = await User.findById(req.user._id)
    
        if(!user){
            return next(createError("User not found" , 404))
        }

        const updatedUser = await User.findByIdAndUpdate(user._id , {
            $set : {
                username ,
                email
            }
        } , {new : true})

        updatedUser.password = undefined

        res.status(200).json(updatedUser)

    } catch (error) {
        next(error)
    }

}




module.exports = {register , login , getUser , changePassword , updateProfile}



