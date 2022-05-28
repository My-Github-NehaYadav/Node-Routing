require('../DBconnection/db');
const mongoose = require("mongoose");

const Users = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Phone_no: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model("Users", Users);