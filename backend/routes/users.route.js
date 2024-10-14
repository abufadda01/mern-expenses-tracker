const {Router} = require("express")
const { register, login, getUser, changePassword, updateProfile } = require("../controllers/users.controller")
const auth = require("../middlewares/auth")


const userRouter = Router()


userRouter.post("/register" , register)

userRouter.post("/login" , login)

userRouter.get("/getUser" , auth , getUser)

userRouter.post("/change-password" , auth , changePassword)

userRouter.post("/update-profile" , auth , updateProfile)


module.exports = userRouter