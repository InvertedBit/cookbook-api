const Image = require('./imageModel');
const staticDir = 'static/';
const imageDir = 'uploads/images/';
const fs = require('fs');
const mongoose = require('mongoose');


exports.index = function (req, res) {
    Image.get(function (err, images) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            status: "success",
            messaage: "Images retrieved successfully",
            data: images
        });
    });
}


exports.new = function (req, res) {
    // console.log(req.files);
    // console.log(req.body);

    let image = new Image({
        _id: new mongoose.Types.ObjectId()
    });

    // recipe.images = [];
    if (req.files !== undefined && req.files.image !== undefined) {
        let imageFile = req.files.image;

            let imageData = fs.readFileSync(imageFile.path);
            let newPath =  imageDir + image._id + "-" + imageFile.originalFilename;

            image.path = newPath;
            image.type = imageFile.type;
            
            // console.log(imageObject, recipe);
            if (!fs.existsSync(staticDir)) {
                fs.mkdirSync(staticDir, { recursive: true });
            }
            fs.writeFileSync(staticDir + newPath, imageData);
            console.log(image.path);
    }

        
    image.save(function (err) {
        if (err) {
            if (fs.existsSync(staticDir + image.path)) {
                fs.rmSync(staticDir + image.path);
            }
            console.log(err);
            res.json({
                status: "error",
                message: err
            });
        } else {
            res.json({
                status: "success",
                message: "Image uploaded!",
                data: image
            });
        }
    });

}

exports.update = function (req, res) {

}

exports.delete = function (req, res) {
    Image.deleteOne({ _id: req.params.image_id }, function(err, image) {
        if (err)
            res.json(err);

        res.json({
            status: "success",
            message: "Image deleted"
        });
    });
}

exports.view = function (req, res) {
    Image.findById(req.params.image_id, function (err, image) {
        if (err) {
            res.json(err);
        } else {
            res.json({
                message: "Image loading...",
                data: image
            });
        }
    });
}
