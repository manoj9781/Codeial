const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting to database"));

db.once('open', function () {
    console.log("Connection is succesful to database :: MongoDB");
});

module.exports = db;