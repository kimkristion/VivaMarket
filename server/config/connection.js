const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/VivaMarket')

module.exports = mongoose.connection;