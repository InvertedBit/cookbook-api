const User = require('../models/user');

exports.create = async function (req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        let responseUser = ({...user}._doc);
        delete responseUser.password;
        res.status(201).json({
            status: 'success',
            data: {
                user: responseUser,
                token: token
            }
        });

    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error
        });
    }
}

exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Login failed! Check authentication credentials.'
            });
        }
        const token = await user.generateAuthToken();
        let responseUser = ({...user}._doc);
        delete responseUser.password;
        res.json({
            status: 'success',
            data: {
                user: responseUser,
                token: token
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error 
        });
    }
}

exports.get = function (req, res) {
    let user = ({...req.user}._doc);
    delete user.password;
    res.json({
        status: 'success',
        data: user
    });
}

exports.logout = async function (req, res) {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.json({
            status: 'success',
            message: 'Successfully logged out'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error
        });
    }
}

exports.logoutAll = async function (req, res) {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.json({
            status: 'success',
            message: 'Successfully logged out from all devices'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error
        });
    }
}
