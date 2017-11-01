const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOURI);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('MongoDB Connection Established!');
});

module.exports = db;