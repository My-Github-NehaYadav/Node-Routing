const DB = require("./DBconnection/db");
const express = require("express");
const app = express();
const HttpError = require('./middleware/HttpError');

app.use(express.json());
app.use(express.urlencoded());
require("./routes")(app)
app.use(HttpError);

app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Page not found'
    });
});
app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is start on port number ${process.env.PORT}`);
    };
});

module.exports = app;
