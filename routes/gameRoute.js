const gameController = require('../controllers/gameController')
const gameRouter = require('express').Router();

gameRouter.post("/start/:id", gameController.startGame)
// gameRouter.post("/login", gameController.Login)
gameRouter.get('/start/', gameController.getUserGames);

module.exports = gameRouter