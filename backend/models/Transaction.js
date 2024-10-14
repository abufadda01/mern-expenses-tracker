const mongoose = require("mongoose")


const transactionSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref  : "users" ,
        required : true
    },
    type : {
        type : String ,
        required : true ,
        enum : ["income" , "expense"]
    },
    category : {
        type : String ,
        required : true ,
        default : "Uncategorized"
    },
    amount : {
        type : Number ,
        required : true
    },
    date : {
        type : Date ,
        default : Date.now
    },
    description : {
        type : String ,
        required : false
    },
} , {timestamps : true})




const Transaction = mongoose.model("transactions" , transactionSchema)


module.exports = Transaction