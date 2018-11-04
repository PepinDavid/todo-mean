var Courses = require("../models/courses.model");

var _this = this;

exports.getCourses = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try{
        var courses = await Courses.paginate(query, options);
        return courses;
    }catch(e){
        throw Error("Error loaded courses");
    }
}

exports.createCourse = async function(course){
    var newCourse = new Courses({
        title: course.title,
        desc: course.desc,
        createdAt: new Date(),
        user: course.user,
        idListCourses: course.idListCourses,
        modifiedAt: new Date()
    });
    try{
        var savedCourse =  await newCourse.save();
        return savedCourse;
    }catch(e){
        throw Error("Error when created course");
    }
}

exports.updateCourse = async function(course){
    var id = course._id;
    try{
        var oldCourses = await Courses.findById(id);
    }catch(e){
        throw Error("course id is not exists");
    }

    if(!oldCourses)
        return false;

    try{
        for(var k in course){
            if(k != "_id")
                oldCourses[k] = course[k];
        }
        oldCourses.modifiedAt = new Date();
        var updatedCourse = await oldCourses.save();
        return updatedCourse;
    }catch(e){
        throw Error("Error when updated course");
    }
}

exports.deleteCourse = async function(id){
    try{
        var removedCourse = await Courses.deleteOne({_id: id});
        if(removedCourse.n === 0)
            throw Error("Course could not be deleted")
        return removedCourse
    }catch(e){
        throw Error("Error occured while deleted course");
    }
}

exports.deleteCourseIdList = async function(id){
    try{
        var removedCourse = await Courses.deleteOne({idListCourses: id});
        if(removedCourse.n === 0)
            throw Error("Course could not be deleted")
        return removedCourse;
    }catch(e){
        throw Error("Error occured while deleted course");
    }
}
