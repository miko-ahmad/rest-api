const { Game, User } = require('../models');

exports.startGame = async (req, res) => {
    try {
      const { id } = req.params;
      const { playerChoice } = req.body;
  
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          status: "FAILED",
          message: "User not found",
        });
      }
  
      const choices = ["rock", "paper", "scissors"];
      const botChoice = choices[Math.floor(Math.random() * choices.length)];
  
      const isWin = (playerChoice === "rock" && botChoice === "scissors") ||
        (playerChoice === "paper" && botChoice === "rock") ||
        (playerChoice === "scissors" && botChoice === "paper");
  
      const isDraw = playerChoice === botChoice;
      
      // Perbarui logika hasil permainan
      const gameResult = isWin ? "Player Win" : isDraw ? "Draw" : "Player Lose";
      
      const score = isWin ? 100 : isDraw ? 50 : 0;
  
      await Game.create({
        playerChoice,
        botChoice,
        result: gameResult,
        score,
        userId: id,
      });
  
      const games = await Game.findAll({
        where: { userId: id },
        attributes: ["score"],
      });
  
      const totalScore = games.reduce((accumulator, game) => accumulator + game.score, 0);
      user.totalScore = totalScore;
      await user.save();
  
      return res.json({
        status: "SUCCESS",
        data: {
          playerChoice,
          botChoice,    
          result: gameResult,
          score,
          totalScore,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "FAILED",
        message: "Internal server error",
      });
    }
  };
  
  
exports.getUserGames = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const games = await Game.findAll({
        where: { userId },
        attributes: ["playerChoice", "botChoice", "result", "score", "createdAt"],
      });
  
      return res.json({
        status: "SUCCESS",
        data: games,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "FAILED",
        message: "Internal server error"
      });
    }
  };
