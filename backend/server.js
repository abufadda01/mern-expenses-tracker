const express = require("express")
const cors = require("cors")

require("dotenv").config()

const errorHandler = require("./middlewares/errorHandler")
const userRouter = require("./routes/users.route")
const connectDB = require("./db/connectDB")


const app = express()

// ! middlwares
app.use(express.json())
app.use(cors())


// ! routes
app.use("/api/v1/users" , userRouter)


// ! custom error handler middleware
app.use(errorHandler) 




const PORT = process.env.PORT || 8000

const start = async () => {
    try {
        app.listen(PORT , console.log(`EXPENSES TRACKER SERVER STARTED ON PORT ${PORT}`))
        await connectDB()
    } catch (error) {
        console.log(error)
    }
}


start()


