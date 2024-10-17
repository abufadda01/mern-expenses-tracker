const {Router} = require("express")
const auth = require("../middlewares/auth")
const {addCategory , getUserCategories , updateCategory , deleteCategory} = require("../controllers/category.controller")


const categoryRouter = Router()


categoryRouter.post("/" , auth , addCategory)

categoryRouter.get("/" , auth , getUserCategories)







module.exports = categoryRouter