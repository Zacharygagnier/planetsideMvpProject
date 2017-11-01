const db = require('./config')
const mongoose = require('mongoose');


const playerSchema = mongoose.Schema({
    userName: String,
    playerId: String
});

const Player = mongoose.model('Player', playerSchema);


const save = (userName, playerId) => {
    Player.update({playerId: playerId},
       { $set: {userName, playerId}},
        {upsert: true},
         (err, success) => {
      if  (err) {
        console.error(err);
      }
    })    
}

module.exports.save = save;
module.exports.Player = Player;