var express = require('express');
var UserRoute = express.Router();
var passport = require('passport');
var UserCtrl = require('../../controllers/user.controller');

UserRoute.get('/', passport.authenticate('jwt', { session: false}), UserCtrl.getUsers)
            .get('/:userId', passport.authenticate('jwt', { session: false}), UserCtrl.getUser)
            .post('/login', UserCtrl.loginUser)
            .post('/', UserCtrl.createUser)
            .put('/', passport.authenticate('jwt', { session: false}), UserCtrl.updateUser)
            .delete('/:userId', passport.authenticate('jwt', { session: false}), UserCtrl.deleteUser);

module.exports = UserRoute;
