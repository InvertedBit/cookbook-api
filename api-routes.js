const router = require('express').Router();
const recipeController = require('./recipeController');

router.get('/', function (req, res) {
    res.json({
        status: 'API is working!',
        message: 'Welcome to the cookbook API!'
    });
});

router.route('/recipes')
    .get(recipeController.index)
    .post(recipeController.new);

router.route('/recipes/:recipe_id')
    .get(recipeController.view)
    .patch(recipeController.update)
    .put(recipeController.update)
    .delete(recipeController.delete);



module.exports = router;
