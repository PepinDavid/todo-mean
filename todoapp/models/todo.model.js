// David Pépin 					2018-07-27

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ToDoSchema = new mongoose.Schema({
	title: String,
	description: String,
	createdAt: Date,
	modifiedAt: Date,
	status: String,
	user: String,
	modifiedBy: String
});

ToDoSchema.plugin(mongoosePaginate)
const ToDo = mongoose.model('Todo', ToDoSchema)

module.exports = ToDo;
