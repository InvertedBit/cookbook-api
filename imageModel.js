const mongoose = require('mongoose');

let imageSchema = mongoose.Schema({
    path: String,
    type: String
});

var Image = module.exports = mongoose.model('image', imageSchema);

module.exports.get = function (callback, limit) {
    Image.find(callback).limit(limit);
}
