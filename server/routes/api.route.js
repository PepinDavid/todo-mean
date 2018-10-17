var express = require('express');
var router = express.Router();

var ListTodoRoute = require('./api/listtodo.route');
var TodoRoute = require('./api/todo.route');

router.use('/lists', ListTodoRoute);
router.use('/todos', TodoRoute);

module.exports = router;
