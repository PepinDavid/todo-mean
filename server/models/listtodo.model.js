var mongoose = require('mongoose');
var mongoosePagination = require('mongoose-paginate');

var ListTodoSchema = new mongoose.Schema({
    title: String,
    desc: String,
    createdAt: Date,
    user: String,
    modifiedAt: Date,
    status: Boolean
});

ListTodoSchema.plugin(mongoosePagination);
const ListTodo = mongoose.model('ListTodo', ListTodoSchema);

module.exports = ListTodo;
