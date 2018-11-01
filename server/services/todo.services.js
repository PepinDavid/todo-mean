var ToDo = require("../models/todo.model");

var _this = this;

exports.getTodos = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try{
        var todos = await ToDo.find(query, {}, options);
        return todos;
    }catch(e){
        throw Error("Error loaded todos");
    }
}

exports.createTodo = async function(todo){
    var newToDo = new ToDo({
        title: todo.title,
        desc: todo.desc,
        createdAt: new Date(),
        status: "false",
        user: todo.user,
        idList: todo.idList,
        modifiedAt: new Date()
    });
    try{
        var savedToDo =  await newToDo.save();
        return savedToDo;
    }catch(e){
        throw Error("Error when created todo");
    }
}

exports.updateTodo = async function(todo){
    var id = todo._id;
    try{
        var oldTodo = await ToDo.findById(id);
    }catch(e){
        throw Error("todo id is not exists");
    }

    if(!oldTodo)
        return false;

    try{
        for(var k in todo){
            if(k != "_id")
                oldTodo[k] = todo[k];
        }
        oldTodo.modifiedAt = new Date();
        var updatedTodo = await oldTodo.save();
        return updatedTodo;
    }catch(e){
        throw Error("Error when updated todo");
    }
}

exports.deleteTodo = async function(id){
    try{
        var removedTodo = await ToDo.deleteOne({_id: id});
        if(removedTodo.n === 0)
            throw Error("Todo could not be deleted")
        return removedTodo
    }catch(e){
        throw Error("Error occured while deleted todo");
    }
}

exports.deleteTodoIdList = async function(id){
    try{
        var removedTodo = await ToDo.deleteOne({idList: id});
        if(removedTodo.n === 0)
            throw Error("Todo could not be deleted")
        return removedTodo;
    }catch(e){
        throw Error("Error occured while deleted todo");
    }
}
