const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    score: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Player', playerSchema)