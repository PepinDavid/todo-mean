// David Pépin 					2018-07-27
var express = require('express');
var router = express.Router();

var TodoRoute = require('./api/todo.route');

router.use('/todos', TodoRoute);

module.exports = router;
