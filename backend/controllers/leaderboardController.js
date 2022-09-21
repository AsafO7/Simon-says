const Player = require('../models/Player')

// Display leaderboard
const getLeaderboard = async (req, res) => {
    const players = await Player.find({}).sort({score: -1, name: -1}).limit(10)
    res.status(200).json(players)
}

// Create new entry in leaderboard and re-render the page
const createEntry = async (req, res) => {
    const { player, score } = req.body
    try {
        const user = await Player.create({
            name: player,
            score
        })
        if(user) {
            console.log("User successfully registered")
            res.status(200).redirect('/leaderboard')
        }
        else {
            res.status(400)
            throw new Error("Invalid data")
        }
    }
    catch(err) {
        throw new Error("Something went wrong")
    }
}

module.exports = { getLeaderboard, createEntry }