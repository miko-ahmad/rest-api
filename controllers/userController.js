const { User, Game } = require('../models');

exports.getUser = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "username", "imgUrl","totalScore"], // Menambahkan "id" ke atribut yang diambil
        });

        if (!users || users.length === 0) {
            return res.status(404).json({
                status: "FAILED",
                message: "No users found"
            });
        }

        const formattedUsers = users.map(user => ({
            id: user.id, // Menambahkan ID ke data pengguna
            username: user.username,
            imgUrl: user.imgUrl,
            totalScore: user.totalScore,
        }));

        return res.json({
            status: "SUCCESS",
            data: formattedUsers,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "FAILED",
            message: "Internal server error"
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params; 

        const user = await User.findOne({
            where: { id },
            attributes: ["username", "imgUrl", "id", "totalScore"],
            include: [
                {
                    model: Game,
                    attributes: ["id","playerChoice","botChoice","result","userId","score", "createdAt"],
                },
            ],
        });

        if (!user) {
            return res.status(404).json({
                status: "FAILED",
                message: "User not found"
            });
        }

        return res.json({
            status: "SUCCESS",
            data: {
                id: user.id,
                username: user.username,
                imgUrl: user.imgUrl,
                totalScore: user.totalScore,
                game: user.Games.map(game => ({
                    id: game.id,
                    score: game.score,
                    playerChoice: game.playerChoice,
                    botChoice: game.botChoice,
                    result: game.result,
                    createdAt: game.createdAt,
                  })),
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "FAILED",
            message: "Internal server error"
        });
    }
}

