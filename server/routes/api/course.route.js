var express = require('express');
var CoursesRouter = express.Router({mergeParams: true});
var mid = require('../../controllers/middleware.controller');
var CoursesCtrl = require('../../controllers/courses.controller');

CoursesRouter.get("/", mid.requiresLogin, CoursesCtrl.getCourses)
        .get("/:id", mid.requiresLogin, CoursesCtrl.getCourse)
        .post("/", mid.requiresLogin, CoursesCtrl.createCourse)
        .put("/", mid.requiresLogin, CoursesCtrl.updateCourse)
        .delete("/:id", mid.requiresLogin, CoursesCtrl.deleteCourse);

module.exports = CoursesRouter;
