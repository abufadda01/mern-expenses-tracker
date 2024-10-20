const Joi = require("joi")
const createError = require("../utils/createError")
const Category = require("../models/Category")
const Transaction = require("../models/Transaction")



const addCategory = async (req , res , next) => {

    const categorySchema = Joi.object({
        name : Joi.string().min(3).required() ,
        type: Joi.string().valid("income" , "expense").required(),
    })

    const {value , error} = categorySchema.validate(req.body , {abortEarly : false})

    if(error){
        return next(createError("Invalid Category credentials" , 400))
    }

    try {
        
        const {name , type} = value

        const normalizedName = name.toLowerCase()

        // const validTypes = ["income" , "expense"]

        // if(!validTypes.includes(type)){
        //     return next(createError(`Invalid category type : ${type}` , 400))
        // }

        const isCategoryExist = await Category.findOne({name : normalizedName , user : req.user._id})

        if(isCategoryExist){
            return next(createError(`category ${isCategoryExist.name} already exist` , 400))
        }

        const newCategory = new Category({
            name : normalizedName ,
            type ,
            user : req.user._id
        })

        await newCategory.save()

        res.status(201).json(newCategory)

    } catch (error) {
        next(error)
    }
}




const getUserCategories = async (req , res , next) => {

    try {
        
        const page = Number(req.query.page) || 1
        const limit = 10 

        const skip = (page - 1) * limit

        const userCategories = await Category.find({user : req.user._id})
            .skip(skip)
            .limit(limit)

        res.status(200).json({
            userCategories ,
            page ,
            totalPages : Math.ceil(userCategories.length / limit)
        })

    } catch (error) {
        next(error)
    }
}




const updateCategory = async (req , res , next) => {

    const {categoryId} = req.params
    
    const updateCategorySchema = Joi.object({
        name : Joi.string().min(3).optional() ,
        type: Joi.string().valid("income" , "expense").optional(),
    })

    const {value , error} = updateCategorySchema.validate(req.body , {abortEarly : false})

    if(error){
        return next(createError("Invalid Category credentials" , 400))
    }

    try {
        
        const {type , name} = value
        const normalizedName = name?.toLowerCase()

        const category = await Category.findById(categoryId)

        if(!category){
            return next(createError("Category not exist" , 404))
        }

        if(category.user.toString() !== req.user._id.toString()){
            return next(createError("you don't have permission to update this category" , 400))
        }

        const updatedCategory = await Category.findOneAndUpdate({_id : categoryId , user : req.user._id} , {
            $set : {
                name : normalizedName ,
                type
            }
        } , {new : true})

        res.status(200).json(updatedCategory)

    } catch (error) {
        next(error)
    }

}




const deleteCategory = async (req , res , next) => {

    const {categoryId} = req.params

    try {
        
        const category = await Category.findById(categoryId)

        if(!category){
            return next(createError("Category not exist" , 404))
        }

        if(category.user.toString() !== req.user._id.toString()){
            return next(createError("you don't have permission to delete this category" , 400))
        }

        const defaultCategory = "Uncategorized"

        await Transaction.updateMany({user : req.user._id , category : category.name} , {
            $set : {
                category : defaultCategory
            }
        })

        await Category.findByIdAndDelete(categoryId)

        res.status(200).json({msg : "category deleted successfully"})

    } catch (error) {
        next(error)
    }

}




module.exports = {
    addCategory , 
    getUserCategories , 
    updateCategory , 
    deleteCategory
}








