//install packages
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
//set port
const PORT = process.env.PORT || 2700;

const app = express();

//use logger
app.use(logger('dev'));

//parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use static files
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Fitness-Tracker', { useNewUrlParser: true });

require("./routes/api-routes.js")(app);

//index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
//exercise
app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/exercise.html'));
});
//stats
app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/stats.html'));
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}..`);
})