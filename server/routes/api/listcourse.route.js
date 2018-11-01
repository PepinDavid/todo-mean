var express = require('express');
var ListCoursesRoute = express.Router();
var passport = require('passport');
var ListCoursesCtrl = require('../../controllers/listcourses.controller');
var CoursesRouter = require('./course.route');
var passport = require('passport');

ListCoursesRoute.use('/:listCoursesId/courses', ListCoursesCtrl.getListCourseForUse, CoursesRouter);

ListCoursesRoute.get('/', passport.authenticate('jwt', { session: false}), ListCoursesCtrl.getListsCourse)
            .get('/:listCoursesId', passport.authenticate('jwt', { session: false}), ListCoursesCtrl.getListCourse)
            .post('/', passport.authenticate('jwt', { session: false}), ListCoursesCtrl.createListCourse)
            .put('/', passport.authenticate('jwt', { session: false}), ListCoursesCtrl.updateListCourse)
            .delete('/:listCoursesId', passport.authenticate('jwt', { session: false}), ListCoursesCtrl.deleteListCourse);

module.exports = ListCoursesRoute;
