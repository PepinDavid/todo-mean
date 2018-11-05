var userSvc = require('../services/user.services');
var passport = require('passport');
var config = require('../config/db.config');
var getToken = require('../config/auth.config');
var jwt = require('jsonwebtoken');

var _this = this;

function ERROR(e){
    if(typeof e === "string")
        return {status: 400, message: e};
    else
        return {status: 400, message: e.message};
}

exports.getUsers = async function(req, res, next){
    var page = req.body.page || 1;
    var limit = req.body.limit || 10;
    var token = getToken(req.headers);
    if(token){
        try{
            var users = await userSvc.getUsers({}, page, limit);
            return res.status(200).json({status: 200, obj: users, message: "Sucessfully loaded users"});
        }catch(e){
            return res.status(400).json(ERROR(e));
        }
    }else{
        return res.status(403).json({status: 403, message: "Unauthorized"});
    }
};

exports.getUser = async function(req, res, next){
    var filter = {};
    var token = getToken(req.headers);
    if(token){
        try{
            var filter = {username: req.user.username, email: req.user.email};
            var user = await userSvc.getUser(filter);
            return res.status(200).json({status: 200, obj: user, message: "Sucessfully loaded user"});
        }catch(e){
            return res.status(400).json(ERROR(e));
        }
    }else{
        return res.status(403).json({status: 403, message: "Unauthorized"});
    }
};

exports.loginUser = async function(req, res, next){
    var b = req.body;
    var user = {
        username: b.username,
        password: b.password
    };
    try{
        var user = await userSvc.loginUser(user);
        var token = jwt.sign(user.toJSON(), config.secret);
        req.session.userId = user._id;
        req.session.userUsername = user.username;
        return res.status(200).json({status: 200, token: 'jwt '+token, message: "Sucessfully loaded users"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
};

exports.createUser = async function(req, res, next){
    var b = req.body;
    var user = {
        email: b.email,
        username: b.username,
        name: b.name,
        surname: b.surname,
        password: b.password
    };
    var token = getToken(req.headers);
    if(token){
        try{
            var created = await userSvc.createUser(user);
            var token = jwt.sign(created.toJSON(), config.secret);
            req.session.userId = user._id;
            req.session.userUsername = user.username;
            return res.status(200).json({status: 200, token: 'jwt :'+token, message: "Sucessfully loaded users"});
        }catch(e){
            return res.status(400).json(ERROR(e));
        }
    }else{
        return res.status(403).json({status: 403, message: "Unauthorized"});
    }
};

exports.updateUser = async function(req, res, next){
    var token = getToken(req.headers);
    if(token){
        var id = req.user._id;
        if(!id)
            return res.status(400).json(ERROR("Error: _id not defined"));
        var user = {
            _id: id
        };
        var b = req.body;
        for(var k in b){
            user[k] = b[k];
        }
        try{
            var updated = await userSvc.updateUser(user);
            return res.status(204).json({status: 204, obj: updated, message: "Successfully updated user"});
        }catch(e){
            return res.status(400).json(ERROR(e));
        }
    }else{
        return res.status(403).json({status: 403, message: "Unauthorized"});
    }
};

exports.deleteUser = async function(req, res, next){
    var id = req.body.id;
    if(!id)
        return res.status(400).json(ERROR("Error: _id not defined"));
    var token = getToken(req.headers);
    if(token){
        try{
            var deleted = await userSvc.deleteUser(id);
            return res.status(204).json({status: 204, message: "Successfully deleted user"});
        }catch(e){
            return res.status(400).json(ERROR(e));
        }
    }else{
        return res.status(403).json({status: 403, message: "Unauthorized"});
    }
};
