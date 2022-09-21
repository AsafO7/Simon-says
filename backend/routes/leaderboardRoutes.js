const express = require('express')
const router = express.Router()
const { getLeaderboard, createEntry } = require('../controllers/leaderboardController')

router.route('/').get(getLeaderboard).post(createEntry)

module.exports = router