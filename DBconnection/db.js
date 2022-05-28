require("dotenv").config();
const mongoose = require("mongoose");

module.exports = mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    family: 4
}).then(() => {
    console.log(`Database connected successfully.`);
}).catch((err) => {
    console.log(err);
})