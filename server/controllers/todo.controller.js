var ToDoSvc = require('../services/todo.services');

var _this = this;

function ERROR(e){
    if(typeof e === "string")
        return {status: 400, message: e};
    else
        return {status: 400, message: e.message};
}

exports.getTodos = async function(req, res, next){
    var page = req.body.page || 1;
    var limit = req.body.limit || 10;
    var listId = req.listId;
    var filter = {};
    if(listId)
        filter.idList = listId;
    try{
        var todos = await ToDoSvc.getTodos(filter, page, limit);

        return res.status(200).json({status: 200, obj: todos, message: "Sucessfully loaded todos"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
}

exports.getTodo = async function(req, res, next){
    var page = req.body.page || 1;
    var limit = req.body.limit || 10;
    var listId = req.listId;
    var filter = {};
    if(listId)
        filter.idList = listId;
    filter._id = req.params.id;
    try{
        var todos = await ToDoSvc.getTodos(filter, page, limit);

        return res.status(200).json({status: 200, obj: todos, message: "Sucessfully loaded todos"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
}

exports.createTodo = async function(req, res, next){
    var listId = req.listId;
    var todo = {
        title: req.body.title,
        desc: req.body.desc,
        status: req.body.status,
        idList: listId,
        user: "poney",
    }
    try{
        var created = await ToDoSvc.createTodo(todo);
        return res.status(201).json({status: 201, obj: created, message: "Successfully created todo"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
}

exports.updateTodo = async function(req, res, next){
    var id = req.body._id;
    if(!id)
        return res.status(400).json(ERROR("Error: _id not defined"));
    var b = req.body;
    var todo = {
        _id: id,
        title: b.title,
        desc: b.desc,
        status: b.status,
        user: "poney"
    }
    try{
        var updated = await ToDoSvc.updateTodo(todo);
        return res.status(200).json({status: 200, obj: updated, message: "Successfully updated todo"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
}

exports.deleteTodo = async function(req, res, next){
    var id = req.params.id;
    if(!id)
        return res.status(400).json(ERROR("Error: _id not defined"));
    try{
        var deleted = await ToDoSvc.deleteTodo(id);
        return res.status(204).json({status: 204, obj: deleted, message: "Successfully deleted todo"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
}

exports.deleteTodoIdList = async function(req, res, next){
    var id = req.listId;
    if(!id)
        return res.status(400).json(ERROR("Error: _id not defined"));
    try{
        var deleted = await ToDoSvc.deleteTodoIdList(id);
        return res.status(204).json({status: 204, message: "Successfully deleted todo"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
}
