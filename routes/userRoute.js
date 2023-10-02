const userController = require('../controllers/userController')
const passport = require('../lib/passport')
const playerRouter = require('express').Router();

playerRouter.get("/" , userController.getUser)
playerRouter.get("/:id" , passport.authenticate("jwt", { session : false }), userController.getUserById)

module.exports = playerRouter