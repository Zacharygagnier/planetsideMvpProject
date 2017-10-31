var mongoose = require('mongoose');


const playerSchema = mongoose.Schema({
    username: String,
    playerId: Number
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;