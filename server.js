const express = require('express');
const Joi = require('joi');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const formData = require('express-form-data');

//app.use(express.json());
app.use(cors());
app.use(formData.parse());
app.use(express.static('static'));

mongoose.connect('mongodb://localhost:27017/cookbook', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

const apiRoutes = require("./api-routes");

app.use('/api/v1', apiRoutes);


// const recipes = [
//     {
//         id: 0,
//         name: "Daube",
//         description: "Short description for Daube"
//     },
//     {
//         id: 1,
//         name: "Lasagne",
//         description: "Short description for Lasagne"
//     },
//     {
//         id: 2,
//         name: "Spaghetti Carbonara",
//         description: "Short description for Spaghetti Carbonara"
//     },
//     {
//         id: 3,
//         name: "Chili Con Carne",
//         description: "Short description for Chili Con Carne"
//     },
// ];


// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

// app.get('/recipes', function (req, res) {
//     console.log('GET call on /recipes....');
//     res.send(recipes);
// });

// app.put('/recipes/:id', function (req, res) {
//     const recipe = {
//         id: recipes.length,
//         name: req.body.name,
//         description: req.body.description
//     };
//     recipes.push(recipe);
//     res.send(recipe);
// });

// app.post('/recipes', function (req, res) {
//     const recipe = recipes.find(r => r.id === parseInt(req.params.id));
//     if (!recipe) res.status(404).send('Not found!');

//     recipe.name = req.body.name;
//     recipe.description = req.body.description;
//     res.send(recipe);
// });


const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
