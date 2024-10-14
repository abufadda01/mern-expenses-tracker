const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        required : true ,
        unique : true
    },
    email : {
        type : String ,
        required : true ,
        unique : true
    },
    password : {
        type : String ,
        required : true ,
    },
} , {timestamps : true})



userSchema.pre("save" , async function(next){

    if(!this.isModified("password")){
        next
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password , salt)
    this.password = hashedPassword

})



userSchema.methods.comparePassword = async function(password , savedPassword){
    return await bcrypt.compare(password , savedPassword)
}


userSchema.methods.signJWT = function(){
    return jwt.sign({userId : this._id} , process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXPIRE})
}



const User = mongoose.model("users" , userSchema)


module.exports = User