var express = require('express');
var UserRoute = express.Router();
//var auth = require('../../config/auth');
var UserCtrl = require('../../controllers/user.controller');


UserRoute.get('/', UserCtrl.getUsers)
            .get('/:userId', UserCtrl.getUser)
            .post('/login', UserCtrl.loginUser)
            .post('/', UserCtrl.createUser)
            .put('/', UserCtrl.updateUser)
            .delete('/:userId', UserCtrl.deleteUser);

module.exports = UserRoute;
