var express = require('express');
var passport = require('passport');
var ListTodoRoute = express.Router();
var ListTodoCtrl = require('../../controllers/listtodo.controller');
var TodoRouter = require('./todo.route');

ListTodoRoute.use('/:listId/todos', ListTodoCtrl.getListTodoForUse, TodoRouter);
ListTodoRoute.get('/', passport.authenticate('jwt', { session: false}), ListTodoCtrl.getListsTodo)
            .get('/:listId', passport.authenticate('jwt', { session: false}), ListTodoCtrl.getListTodo)
            .post('/', passport.authenticate('jwt', { session: false}), ListTodoCtrl.createListTodo)
            .put('/', passport.authenticate('jwt', { session: false}), ListTodoCtrl.updateListTodo)
            .delete('/:listId', passport.authenticate('jwt', { session: false}), ListTodoCtrl.deleteListTodo);

module.exports = ListTodoRoute;
