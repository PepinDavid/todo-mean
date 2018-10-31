const express = require('express');
const router = express.Router();

const ListTodoRoute = require('./api/listtodo.route');
const TodoRoute = require('./api/todo.route');
const UserRoute = require('./api/user.route');
const FilesRoute = require('./api/files.route');
const ListCoursesRoute = require('./api/listcourse.route');
const CoursesRoute = require('./api/course.route');
const CollecFilesRoute = require('./api/collecFiles.route');
router.use('/lists', ListTodoRoute);
router.use('/todos', TodoRoute);
router.use('/user', UserRoute);
router.use('/files', FilesRoute);
router.use('/collecfiles', CollecFilesRoute);
router.use('/listscourse', ListCoursesRoute);
router.use('/courses', CoursesRoute);

module.exports = router;
