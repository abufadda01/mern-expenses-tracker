const {Router} = require("express")
const auth = require("../middlewares/auth")

const { 
    createTransaction , 
    getUserTransactions , 
    getFilteredTransactions , 
    updateTransaction ,
    deleteTransaction
} = require("../controllers/transaction.controller")


const transactionRouter = Router()


transactionRouter.post("/" , auth , createTransaction)

transactionRouter.get("/" , auth , getUserTransactions)

transactionRouter.get("/filtered-transactions" , auth , getFilteredTransactions)

transactionRouter.patch("/update-transaction/:transactionId" , auth , updateTransaction)

transactionRouter.delete("/delete-transaction/:transactionId" , auth , deleteTransaction)



module.exports = transactionRouter
