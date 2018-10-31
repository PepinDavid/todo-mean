var CoursesSvc = require('../services/courses.services');

var _this = this;

function ERROR(e){
    if(typeof e === "string")
        return {status: 400, message: e};
    else
        return {status: 400, message: e.message};
}

exports.getCourses = async function(req, res, next){
    var page = req.body.page || 1;
    var limit = req.body.limit || 10;
    var idListCourses = req.listCoursesId;
    var filter = {};
    if(idListCourses)
        filter.idListCourses = idListCourses;
    try{
        var courses = await CoursesSvc.getCourses(filter, page, limit);
        return res.status(200).json({status: 200, obj: courses, message: "Sucessfully loaded courses"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
}

exports.getCourse = async function(req, res, next){
    var page = req.body.page || 1;
    var limit = req.body.limit || 10;
    var idListCourses = req.listCoursesId;
    var filter = {};
    if(idListCourses)
        filter.idListCourses = idListCourses;
    filter._id = req.params.id;
    try{
        var courses = await CoursesSvc.getCourses(filter, page, limit);

        return res.status(200).json({status: 200, obj: courses, message: "Sucessfully loaded courses"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
}

exports.createCourse = async function(req, res, next){
    var idListCourses = req.listCoursesId;
    var course = {
        title: req.body.title,
        desc: req.body.desc,
        idListCourses: idListCourses,
        user: "poney",
    }
    try{
        var created = await CoursesSvc.createCourse(course);
        return res.status(201).json({status: 201, obj: created, message: "Successfully created course"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
}

exports.updateCourse = async function(req, res, next){
    var id = req.body._id;
    if(!id)
        return res.status(400).json(ERROR("Error: _id not defined"));
    var b = req.body;
    var course = {
        _id: id,
        title: b.title,
        desc: b.desc,
        user: "poney"
    }
    try{
        var updated = await CoursesSvc.updateCourse(course);
        return res.status(200).json({status: 200, obj: updated, message: "Successfully updated course"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
}

exports.deleteCourse = async function(req, res, next){
    var id = req.params.id;
    if(!id)
        return res.status(400).json(ERROR("Error: _id not defined"));
    try{
        var deleted = await CoursesSvc.deleteCourse(id);
        return res.status(204).json({status: 204, obj: deleted, message: "Successfully deleted course"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
}

exports.deleteCourseIdList = async function(req, res, next){
    var id = req.listId;
    if(!id)
        return res.status(400).json(ERROR("Error: _id not defined"));
    try{
        var deleted = await CoursesSvc.deleteCourseIdList(id);
        return res.status(204).json({status: 204, message: "Successfully deleted course"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
}
