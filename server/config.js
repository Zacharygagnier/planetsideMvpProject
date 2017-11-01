const mongoose = require('mongoose');

mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('MongoDB Connection Established!');
});

module.exports = db;