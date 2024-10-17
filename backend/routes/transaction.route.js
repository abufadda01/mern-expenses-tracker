const {Router} = require("express")
const auth = require("../middlewares/auth")
const { createTransaction, getUserTransactions, getFilteredTransactions } = require("../controllers/transaction.controller")


const transactionRouter = Router()


transactionRouter.post("/" , auth , createTransaction)

transactionRouter.get("/" , auth , getUserTransactions)

transactionRouter.get("/filtered-transactions" , auth , getFilteredTransactions)




module.exports = transactionRouter
