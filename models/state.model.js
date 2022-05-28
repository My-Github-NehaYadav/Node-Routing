const mongoose = require("mongoose");
require('../DBconnection/db');

const State = new mongoose.Schema({
    State: {
        type: String,
        required: true
    },
    Country:{ type: "ObjectId", ref: 'countries' }
})

module.exports = new mongoose.model("states", State);