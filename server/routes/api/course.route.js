var express = require('express');
var passport = require('passport');
var CoursesRouter = express.Router({mergeParams: true});
var CoursesCtrl = require('../../controllers/courses.controller');


CoursesRouter.get("/", passport.authenticate('jwt', {session: false}), CoursesCtrl.getCourses)
        .get("/:id", passport.authenticate('jwt', {session: false}), CoursesCtrl.getCourse)
        .post("/", passport.authenticate('jwt', {session: false}), CoursesCtrl.createCourse)
        .put("/", passport.authenticate('jwt', {session: false}), CoursesCtrl.updateCourse)
        .delete("/:id", passport.authenticate('jwt', {session: false}), CoursesCtrl.deleteCourse);

module.exports = CoursesRouter;
