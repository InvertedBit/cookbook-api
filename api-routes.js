const router = require('express').Router();
const recipeController = require('./recipeController');
const imageController = require('./imageController');

router.get('/', function (req, res) {
    res.json({
        status: 'API is working!',
        message: 'Welcome to the cookbook API!'
    });
});

// Recipe routes
router.route('/recipes')
    .get(recipeController.index)
    .post(recipeController.new);

router.route('/recipes/:recipe_id')
    .get(recipeController.view)
    .patch(recipeController.update)
    .put(recipeController.update)
    .delete(recipeController.delete);

// Image routes
router.route('/images')
    .get(imageController.index)
    .post(imageController.new);

router.route('/images/:image_id')
    .get(imageController.view)
    .patch(imageController.update)
    .put(imageController.update)
    .delete(imageController.delete);


module.exports = router;
