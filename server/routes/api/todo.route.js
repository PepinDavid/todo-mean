var express = require('express');
var passport = require('passport');
var TodoRouter = express.Router({mergeParams: true});
var ToDoCtrl = require('../../controllers/todo.controller');

TodoRouter.get("/", passport.authenticate('jwt', { session: false}), ToDoCtrl.getTodos)
        .get("/:id", passport.authenticate('jwt', { session: false}), ToDoCtrl.getTodo)
        .post("/", passport.authenticate('jwt', { session: false}), ToDoCtrl.createTodo)
        .put("/", passport.authenticate('jwt', { session: false}), ToDoCtrl.updateTodo)
        .delete("/:id", passport.authenticate('jwt', { session: false}), ToDoCtrl.deleteTodo);

module.exports = TodoRouter;
