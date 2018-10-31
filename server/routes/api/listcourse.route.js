var express = require('express');
var ListCoursesRoute = express.Router();
var ListCoursesCtrl = require('../../controllers/listcourses.controller');
var CoursesRouter = require('./course.route');
var mid = require('../../controllers/middleware.controller')

ListCoursesRoute.get('/', mid.requiresLogin, ListCoursesCtrl.getListsCourse)
            .get('/:listCoursesId', ListCoursesCtrl.getListCourse)
            .post('/', ListCoursesCtrl.createListCourse)
            .put('/',ListCoursesCtrl.updateListCourse)
            .delete('/:listCoursesId', ListCoursesCtrl.deleteListCourse);

ListCoursesRoute.use('/:listCoursesId/courses', ListCoursesCtrl.getListCourseForUse, CoursesRouter);
module.exports = ListCoursesRoute;
