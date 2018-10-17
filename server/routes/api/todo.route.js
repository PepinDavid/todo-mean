var express = require('express');
var TodoRouter = express.Router({mergeParams: true});

var ToDoCtrl = require('../../controllers/todo.controller');

TodoRouter.get("/",ToDoCtrl.getTodos)
        .get("/:id", ToDoCtrl.getTodos)
        .post("/", ToDoCtrl.createTodo)
        .put("/",ToDoCtrl.updateTodo)
        .delete("/:id", ToDoCtrl.deleteTodo);

module.exports = TodoRouter;
