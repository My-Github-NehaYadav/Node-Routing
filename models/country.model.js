const mongoose = require("mongoose");
require('../DBconnection/db');

const Country = new mongoose.Schema({
    Country: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model("countries", Country);