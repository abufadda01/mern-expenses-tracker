const express = require("express")
const cors = require("cors")

require("dotenv").config()

const errorHandler = require("./middlewares/errorHandler")
const userRouter = require("./routes/users.route")
const connectDB = require("./db/connectDB")
const categoryRouter = require("./routes/category.route")
const transactionRouter = require("./routes/transaction.route")


const app = express()

// ! middlwares
app.use(express.json())
app.use(cors())


// ! routes
app.use("/api/v1/users" , userRouter)
app.use("/api/v1/category" , categoryRouter)
app.use("/api/v1/transaction" , transactionRouter)


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


