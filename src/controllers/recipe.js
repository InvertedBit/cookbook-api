const Recipe = require('../models/recipe');
const Image = require('../models/image');
const staticDir = 'static/';
const imageDir = 'uploads/images/';
const fs = require('fs');

exports.index = function (req, res) {
    Recipe.find().populate('images').populate('thumbnail').exec(function (err, recipes) {
        // if (err) {
        //     res.json({
        //         status: "error",
        //         message: err
        //     });
        // }
        res.json({
            status: "success",
            message: "Recipes retrieved successfully",
            data: recipes
        });
    });
    // Recipe.get(function (err, recipes) {
    //     if (err) {
    //         res.json({
    //             status: "error",
    //             message: err
    //         });
    //     }
    //     let populatedRecipes = [];
    //     recipes.forEach(function (recipe, index) {
    //         recipe.populate('images').populate('thumbnail').exec(function (err, populatedRecipe) {
    //             populatedRecipes.push(populatedRecipe);
    //         });
    //     });
    //     res.json({
    //         status: "success",
    //         messaage: "Recipes retrieved successfully",
    //         data: populatedRecipes
    //     });
    // });
}

exports.new = function (req, res) {
    console.log(req.files);
    console.log(req.body);

    
    var recipe = new Recipe();
    recipe.name = req.body.name ? req.body.name : recipe.name;
    recipe.description = req.body.description ? req.body.description : recipe.description;

    recipe.images = [];

    if (req.body.images !== undefined) {
        let images = JSON.parse(req.body.images);
        recipe.images = images;
        // images.forEach(function (image, index) {
        //     Image.findOne({ _id: image }, function(error, foundImage) {
        //         if (error) {
        //             console.log(error);
        //             return;
        //         }
        //         recipe.images.push(foundImage._id);
        //     });
        // }, recipe);
    }

    if (req.body.thumbnail !== undefined) {
        recipe.thumbnail = req.body.thumbnail;
        // Image.findOne({ _id: req.body.thumbnail }, function(error, foundImage) {
        //     if (error) {
        //         console.log(error);
        //         return;
        //     }
        //     recipe.thumbnail = foundImage._id;
        // });
    }

    // recipe.images = [];
    // if (req.files !== undefined && req.files.length > 0) {
    //     let images = Object.values(req.files);
    //     if (images.length > 0) {
    //         images.forEach(function (image, index) {
    //             let imageData = fs.readFileSync(image.path);
    //             let recipeImgDir = imageDir + recipe.name.replace(/[\W_]/g, "_").toLowerCase();
    //             let newPath =  recipeImgDir + "/" + image.originalFilename;
                
    //             let imageObject = {
    //                 path: newPath,
    //                 type: image.type,
    //                 thumbnail: parseInt(req.body.defaultImage) === index
    //             };
    //             console.log(imageObject, recipe);
    //             fs.mkdirSync(staticDir + recipeImgDir, { recursive: true });
    //             fs.writeFileSync(staticDir + newPath, imageData);
    //             recipe.images.push(imageObject);
    //         }, recipe, req);
    //     }
    // }


    if (req.body.ingredients !== undefined && req.body.ingredients !== 'undefined') {
        if (req.body.ingredients.length > 0) {
            let ingredients = JSON.parse(req.body.ingredients);
            ingredients.forEach(function (ingredient, index) {
                let newIngredient = {
                    name: ingredient.name,
                    amount: ingredient.amount,
                    unit: ingredient.unit
                };
                recipe.ingredients.push(newIngredient);
            }, recipe);
        }
    }

    if (req.body.steps !== undefined && req.body.steps !== 'undefined') {
        if (req.body.steps.length > 0) {
            let steps = JSON.parse(req.body.steps);
            steps.forEach(function (step, index) {
                let newStep = {
                    heading: step.heading,
                    content: step.content,
                    duration: parseInt(step.duration),
                    unit: step.unit
                };
                recipe.steps.push(newStep);
            }, recipe);
        }
    }

    console.log(recipe);

    recipe.save(function (err) {
        if (err) {
            console.log(err);
            res.json({
                status: "error",
                message: err
            });
        } else {
            res.json({
                message: "New recipe created!",
                data: recipe
            });
        }
    });
}

exports.view = function (req, res) {
    Recipe.findById(req.params.recipe_id, function (err, recipe) {
        if (err) {
            res.json(err);
        } else {
            res.json({
                message: "Recipe loading...",
                data: recipe
            });
        }
    });
}

exports.update = function (req, res) {
    Recipe.findById(req.params.recipe_id, function (err, recipe) {
        if (err) {
            res.send(err);
        } else {
            recipe.name = req.body.name ? req.body.name : recipe.name;
            recipe.description = req.body.description ? req.body.description : recipe.description;
            recipe.servings = req.body.servings ? req.body.servings : recipe.servings;
            
            if (req.files !== undefined && req.files.length > 0) {
                // Update images
            }

            if (req.body.ingredients !== undefined && req.body.ingredients.length > 0) {
                // Update ingredients
            }

            if (req.body.steps !== undefined && req.body.steps.length > 0) {
                // Update steps
            }
            
            recipe.save(function (err) {
                if (err) {
                    res.json(err);
                } else {
                    res.json({
                        message: 'Recipe updated',
                        data: recipe
                    });
                }
            });
        }
    });
}

exports.delete = function (req, res) {
    Recipe.deleteOne({ _id: req.params.recipe_id }, function(err, recipe) {
        if (err)
            res.json(err);

        res.json({
            status: "success",
            message: "Recipe deleted"
        });
    });
}

