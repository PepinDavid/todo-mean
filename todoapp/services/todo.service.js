// David Pépin						2018-07-27

var Todo = require('../models/todo.model');

var _this = this; //for register context of this service inside module

exports.getTodo = async function(query, page, limit){
	//option setup mongoose-paginate
	var options = {
		page,
		limit
	};

	//try, catch
	try {
		var todos = await Todo.find(query, options);
		return todos;
	}catch(e){
		throw Error('Error while paginating ToDo');
	}
};

exports.createTodo = async function(todo){
	var newTodo = new Todo({
		title: todo.title,
		description: todo.description,
		createdAt: new Date(),
		status: todo.status,
		user: 'Pony_Test',
		modifiedBy: 'Pony_Test'
	});
	try{
		var saveTodo = await newTodo.save();
		return saveTodo;
	}catch(e){
		throw Error('Error while created ToDo');
	}
};

exports.updateTodo = async function(todo){
	var id = todo._id;

	try{
		var oldTodo = await Todo.findById(id);
	}catch(e){
		throw Error('Error while find Todo by id');
	}
	if(!oldTodo)
		return false;

	oldTodo.title = todo.title;
	oldTodo.description = todo.description;
	oldTodo.status = todo.status;
	oldTodo.modifiedAt = new Date();
	oldTodo.modifiedBy = 'Pony_modified';

	try{
		var savedTodo = await oldTodo.save();
		return savedTodo;
	}catch(e){
		throw Error('Error when update todo id: '+id);
	}
}

exports.removeTodo = async function(id){
	try{
		var deleted = await Todo.remove({_id: id});
		if(deleted.result.n === 0){
            		throw Error('Todo Could not be deleted');
        	}
		return deleted
	}catch(e){
		throw Error('Error when try deleted Todo id: '+id);
	}
}
