const mongoose = require('mongoose');

let imageSchema = mongoose.Schema({
    path: String,
    type: String,
    thumbnail: Boolean
});

let ingredientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
});

let stepSchema = mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    duration: Number,
    unit: String
});

let recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'image' }],
    thumbnail: { type: mongoose.Schema.Types.ObjectId, ref: 'image' },
    servings: Number,
    ingredients: [ingredientSchema],
    steps: [stepSchema],
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateModified: {
        type: Date,
        default: Date.now
    }
});

var Recipe = module.exports = mongoose.model('recipe', recipeSchema);

module.exports.get = function (callback, limit) {
    Recipe.find(callback).limit(limit);
}
