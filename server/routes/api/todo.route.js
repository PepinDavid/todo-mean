var express = require('express');
var TodoRouter = express.Router({mergeParams: true});
var mid = require('../../controllers/middleware.controller');
var ToDoCtrl = require('../../controllers/todo.controller');

TodoRouter.get("/", mid.requiresLogin, ToDoCtrl.getTodos)
        .get("/:id", mid.requiresLogin, ToDoCtrl.getTodos)
        .post("/", mid.requiresLogin, ToDoCtrl.createTodo)
        .put("/", mid.requiresLogin, ToDoCtrl.updateTodo)
        .delete("/:id", mid.requiresLogin, ToDoCtrl.deleteTodo);

module.exports = TodoRouter;
