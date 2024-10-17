const Joi = require("joi")
const createError = require("../utils/createError")
const Transaction = require("../models/Transaction")



const createTransaction = async (req , res , next) => {

    const transactionSchema = Joi.object({
        category : Joi.string().min(3) ,
        description : Joi.string().min(3).required() ,
        amount : Joi.number().min(0).required() ,
        date : Joi.date() ,
        type: Joi.string().valid("income" , "expense").required(),
    })

    const {value , error} = transactionSchema.validate(req.body , {abortEarly : false})

    if(error){
        return next(createError("Invalid Transaction credentials" , 400))
    }

    try {
        
        const {type , description , date , amount , category} = value

        const newTransaction = new Transaction({
            amount ,
            category ,
            date ,
            type ,
            description ,
            user : req.user._id
        })

        await newTransaction.save()

        res.status(201).json(newTransaction)

    } catch (error) {
        next(error)
    }

}




const getUserTransactions = async (req , res , next) => {
    try {

        const page = Number(req.query.page) || 1
        const limit = 10 

        const skip = (page - 1) * limit

        const userTransactions = await Transaction.find({user : req.user._id}).skip(skip).limit(limit)

        res.status(200).json({
            userTransactions ,
            page ,
            totalPages : Math.ceil(userTransactions.length / limit)
        })

    } catch (error) {
        
    }
}




const getFilteredTransactions = async (req , res , next) => {

    const filteredTransactionSchema = Joi.object({
        category : Joi.string().min(3) ,
        startDate : Joi.date() ,
        endDate : Joi.date() ,
        type: Joi.string().valid("income" , "expense"),
        page : Joi.number().default(1)
    })

    const {value , error} = filteredTransactionSchema.validate(req.query , {abortEarly : false})

    if(error){
        return next(createError("Invalid Transaction credentials" , 400))
    }

    try {
        
        const limit = 10
        const {category , startDate , endDate , type , page} = value
        const skip = (page - 1) * limit
        
        let filtersObj = {user : req.user._id}

        if(startDate){
            filtersObj.date = {...filtersObj.date , $gte : new Date(startDate)} // we convert the startDate to date object format
        }
     
        if(endDate){
            filtersObj.date = {...filtersObj.date , $lte : new Date(endDate)} // we convert the endDate to date object format
        }

        if(type){
            filtersObj.type = type
        }

        if(category){

            if(category === "All"){
                // if the value is all so there is no need to make custom filter so we return all category type
            }else if(category === "Uncategorized"){
                filtersObj.category = "Uncategorized"
            }else{
                filtersObj.category = category
            }

        }

        const filteredTransaction = await Transaction.find(filtersObj).skip(skip).limit(limit).sort({date : -1})

        res.status(200).json({
            filteredTransaction ,
            page ,
            totalPages : Math.ceil(filteredTransaction.length / limit)
        })

    } catch (error) {
        next(error)
    }

}




module.exports = {createTransaction , getUserTransactions , getFilteredTransactions}