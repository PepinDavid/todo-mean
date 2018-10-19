var ListTodoSvc = require ('../services/listtodo.services');

var _this = this;

function ERROR(e){
    if(typeof e === "string")
        return {status: 400, message: e};
    else
        return {status: 400, message: e.message};
}

exports.getListsTodo = async function(req, res, next){
    var page = req.body.page || 1;
    var limit = req.body.limit || 10
    try{
        var lists = await ListTodoSvc.getListTodo({}, page, limit);
        return res.status(200).json({status: 200, obj: lists, message: "Successfully loaded lists"});
    }catch(e){
        return res.status(400).json(ERROR(e))
    }
}

exports.getListTodo = async function(req, res, next){
    var page = req.body.page || 1;
    var limit = req.body.limit || 10;
    try{
        var lists = await ListTodoSvc.getListTodo({_id: req.params.listId}, page, limit);

        return res.status(200).json({status: 200, obj: lists, message: "Successfully loaded lists"});
    }catch(e){
        return res.status(400).json(ERROR(e))
    }
}

exports.getListTodoForUse = async function(req, res, next){
    req.listId = req.params.listId;
    next();
}

exports.createListTodo = async function(req, res, next){
    var b = req.body;
    var list = {
        title: b.title,
        desc: b.desc,
        status: b.status,
        user: "poney"
    }

    try{
        var created = await ListTodoSvc.createListTodo(list);
        return res.status(200).json({status: 200, obj: created, message: "Success created List todo"});
    }catch(e){
        return res.status(400).json(ERROR(e))
    }
}

exports.updateListTodo = async function(req, res, next){
    var id = req.params.listId || req.body._id;
    if(!id)
        return res.status(400).json(ERROR("Error: _id not defined"));
    var b = req.body;
    var list = {
        _id: id,
        title: b.title,
        desc: b.desc,
        status: b.status,
        user: "poney"
    };
    try{
        var updated = await ListTodoSvc.updateListTodo(list);
        return res.status(200).json({status: 200, obj: updated, message: "Successfully updated list"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
}

exports.deleteListTodo = async function(req, res, next){
    var id = req.params.listId;
    if(!id)
        return res.status(400).json(ERROR("Error: _id not defined"));
    try{
        var removed = await ListTodoSvc.deleteListTodo(id);
        return res.status(200).json({status: 200, obj: removed, message: "Successfully removed list"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
}
