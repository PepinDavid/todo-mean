// David Pépin 					2018-07-27
var express = require('express');
var router  = express.Router();

var TodoController = require('../../controllers/todo.controller');

router.get('/', TodoController.getTodo);
router.put('/', TodoController.updateTodo);
router.post('/', TodoController.createTodo);
router.delete('/:id', TodoController.removeTodo);

module.exports = router;
