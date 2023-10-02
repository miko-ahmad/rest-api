const authController = require('../controllers/authController')
const authRouter = require('express').Router();

authRouter.post("/register", authController.Register)
authRouter.post("/login", authController.Login)

module.exports = authRouter