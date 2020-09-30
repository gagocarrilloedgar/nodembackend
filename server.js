require('dotenv').config()
const express = require("express"); // Express is for building the Rest apis
const bodyParser = require("body-parser"); // body-parser helps to parse the request and create the req.body object
const cors = require('cors'); //cors provides Express middleware to enable CORS with various options.

console.log(process.env.HOST);
const app = express();
const db = require("./api/models");

// parse requests of content-type - application/json
app.use(bodyParser.json());// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Nodem Bike API" });
});

// db
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
});

const router = require('./api/routes/routes');
app.use('/api',router);


// set port, listen for requests
const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
