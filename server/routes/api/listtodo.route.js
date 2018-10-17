var express = require('express');
var ListTodoRoute = express.Router();

var ListTodoCtrl = require('../../controllers/listtodo.controller');
var TodoRouter = require('./todo.route');

ListTodoRoute.get('/',ListTodoCtrl.getListsTodo)
            .get('/:listId', ListTodoCtrl.getListTodo)
            .post('/', ListTodoCtrl.createListTodo)
            .put('/',ListTodoCtrl.updateListTodo)
            .delete('/:listId', ListTodoCtrl.deleteListTodo);

ListTodoRoute.use('/:listId/todos', ListTodoCtrl.getListTodoForUse, TodoRouter);
module.exports = ListTodoRoute;
