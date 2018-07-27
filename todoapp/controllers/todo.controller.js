// David Pépin						2018-07-27

var TodoService = require('../services/todo.service');

//save context service
var _this = this;

exports.getTodo = async function(req, res, next){
	var page = req.query.page ? req.query.page : 1;
	var limit = req.query.limit ? req.query.limit : 10;

	try{
		var todos = await TodoService.getTodo({},page,limit);
		return res.status(200).json({status: 200, data: todos, mess: 'Successfully Todos Received'});
	} catch(e){
		return res.status(400).json({status: 400, mess: e.message});
	}
};

exports.createTodo = async function(req, res, next){
	var todo = {
		title: req.body.title,
		description: req.body.description,
		status: req.body.status
	};
	try{
		var createdTodo = await TodoService.createTodo(todo);
		return res.status(201).json({status: 201, data: createdTodo, mess: 'Successfully created Todo'});
	}catch(e){
		return res.status(400).json({status: 400, mess: e.message});
	}
};

exports.updateTodo = async function(req, res, next){
	var id =  req.body._id;
	var b = req.body;
	if(!id){
        	return res.status(400).json({status: 400., mess: "Id must be present"});
	}

	var todo = {
		_id: id,
		title: b.title ? b.title: null,
		description: b.description ? b.description: null,
		status: b.status ? b.status : null
	};
	try{
		var updatedTodo = await TodoService.updateTodo(todo);
		return res.status(200).json({status: 200, data: updatedTodo, mess: 'Seccessfully updated Todo'});
	}catch(e){
		return res.status(400).json({status: 400, mess: e.message});
	}
};

exports.removeTodo = async function(req, res, next){
	var id = req.params.id;
	if(!id){
		return res.status(400).json({status: 400, mess: "Id must be present"})
	}
	try{
		var deleted = await TodoService.removeTodo(id);
		return res.status(204).json({status:204, mess: "Succesfully Todo Deleted"});
	}catch(e){
		return res.status(400).json({status: 400, mess: e.message});
	}

}
