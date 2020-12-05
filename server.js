const express = require('express');
const Joi = require('joi');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const formData = require('express-form-data');
const bodyParser = require('body-parser');

// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// })


//app.use(express.json());
app.use(cors());
app.use(formData.parse());
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/cookbook', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

const apiRoutes = require("./api-routes");

app.use('/api/v1', apiRoutes);



const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}...`));

// readline.question('', command => {

// })

module.exports = app;
