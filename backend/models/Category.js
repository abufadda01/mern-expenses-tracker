const mongoose = require("mongoose")


const categorySchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref  : "users" ,
        required : true
    },
    name : {
        type : String ,
        required : true ,
        default : "Uncategorized"
    },
    type : {
        type : String ,
        required : true ,
        enum : ["income" , "expense"]
    }
} , {timestamps : true})



const Category = mongoose.model("categories" , categorySchema)


module.exports = Category