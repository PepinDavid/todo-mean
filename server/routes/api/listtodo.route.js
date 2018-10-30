var express = require('express');
var ListTodoRoute = express.Router();
var auth = require('../../config/auth');
var ListTodoCtrl = require('../../controllers/listtodo.controller');
var TodoRouter = require('./todo.route');
var mid = require('../../controllers/middleware.controller')

ListTodoRoute.get('/', mid.requiresLogin, ListTodoCtrl.getListsTodo)
            .get('/:listId', ListTodoCtrl.getListTodo)
            .post('/', ListTodoCtrl.createListTodo)
            .put('/',ListTodoCtrl.updateListTodo)
            .delete('/:listId', ListTodoCtrl.deleteListTodo);

ListTodoRoute.use('/:listId/todos', ListTodoCtrl.getListTodoForUse, TodoRouter);
module.exports = ListTodoRoute;
