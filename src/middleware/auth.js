const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async(req, res, next) => {
    try {
        if (req.header('Authorization') === undefined) {
            throw new Error();
        }
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({
            _id: data._id,
            'tokens.token': token
        });
        if (!user) {
            throw new Error();
        }
        user.tokens.find(t => t.token === token).lastUse = Date.now();
        await user.save();
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({
            status: 'error',
            message: 'Not authorized to access this resource'
        });
    }
}

module.exports = auth;
