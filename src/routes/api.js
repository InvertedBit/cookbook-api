const router = require('express').Router();
const recipeController = require('../controllers/recipe');
const imageController = require('../controllers/image');
const userController = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/', function (req, res) {
    res.json({
        status: 'API is working!',
        message: 'Welcome to the cookbook API!'
    });
});

// Recipe routes
router.route('/recipes')
    .get(auth, recipeController.index)
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

// Auth / User management routes
router.route('/users')
    .post(userController.create);

router.route('/users/login')
    .post(userController.login);

router.route('/users/me')
    .get(auth, userController.get);

router.route('/users/logout')
    .post(auth, userController.logout);

router.route('/users/logoutall')
    .post(auth, userController.logoutAll);


module.exports = router;
