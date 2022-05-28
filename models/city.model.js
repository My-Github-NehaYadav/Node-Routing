const mongoose = require("mongoose");
require('../DBconnection/db');

const City = new mongoose.Schema({
    City: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model("cities", City);