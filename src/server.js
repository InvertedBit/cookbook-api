const express = require('express');
const Joi = require('joi');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const formData = require('express-form-data');
const bodyParser = require('body-parser');
const mongodbUrl = process.env.MONGODB_URL;
const apiRoutes = require('./routes/api');

// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// })


//app.use(express.json());
app.use(cors());
app.use(formData.parse());
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;


app.use('/api/v1', apiRoutes);



const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}...`));

// readline.question('', command => {

// })

module.exports = app;
