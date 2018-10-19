var userSvc = require('../services/user.services');

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

    try{
        var users = await userSvc.getTodos({}, page, limit);
        return res.status(200).json({status: 200, obj: users, message: "Sucessfully loaded users"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
};

exports.getUser = async function(req, res, next){
    var page = req.body.page || 1;
    var limit = req.body.limit || 10;
    var filter = {};
    try{
        var users = await userSvc.getTodos(filter, page, limit);
        return res.status(200).json({status: 200, obj: users, message: "Sucessfully loaded users"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
};

exports.loginUser = async function(req, res, next){
    var b = req.body;
    var user = {
        username: b.username,
        password: b.password
    };
    try{
        var loggin = await userSvc.loginUser(user);
        return res.status(200).json({status: 200, obj: loggin, message: "Sucessfully loaded users"});
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
        surname: b.name,
        password: b.password
    };
    try{
        var created = await userSvc.createUser(user);
        return res.status(200).json({status: 200, obj: created, message: "Sucessfully loaded users"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
};

exports.updateUser = async function(req, res, next){
    var id = req.body.id;
    if(!id)
        return res.status(400).json(ERROR("Error: _id not defined"));
    var user = {
        _id: id,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email
    };
    try{
        var updated = await userSvc.updateUser(user);
        return res.status(204).json({status: 204, obj: updated, message: "Successfully updated user"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
};

exports.deleteUser = async function(req, res, next){
    var id = req.body.id;
    if(!id)
        return res.status(400).json(ERROR("Error: _id not defined"));
    try{
        var deleted = await userSvc.deleteUser(id);
        return res.status(204).json({status: 204, message: "Successfully deleted user"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
};
