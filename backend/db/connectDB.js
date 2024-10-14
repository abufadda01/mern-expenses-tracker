const mongoose = require("mongoose")


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("EXPENSES TRACKER DB CONNECTED SUCCESSFULLY")
    } catch (error) {
        console.log(`FAILED IN CONNECTION TO THE DB ERR : ${error}`)
        process.exit(1)
    }
}


module.exports = connectDB