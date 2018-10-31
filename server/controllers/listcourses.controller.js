var ListCourseSvc = require ('../services/listcourses.services');

var _this = this;

function ERROR(e){
    if(typeof e === "string")
        return {status: 400, message: e};
    else
        return {status: 400, message: e.message};
}

exports.getListsCourse = async function(req, res, next){
    var page = req.body.page || 1;
    var limit = req.body.limit || 10;
    try{
        var lists = await ListCourseSvc.getListCourse({}, page, limit);
        return res.status(200).json({status: 200, obj: lists, message: "Successfully loaded lists"});
    }catch(e){
        return res.status(400).json(ERROR(e))
    }
}

exports.getListCourse = async function(req, res, next){
    var page = req.body.page || 1;
    var limit = req.body.limit || 10;
    try{
        var lists = await ListCourseSvc.getListCourse({_id: req.params.listCoursesId}, page, limit);

        return res.status(200).json({status: 200, obj: lists, message: "Successfully loaded lists"});
    }catch(e){
        return res.status(400).json(ERROR(e))
    }
}

exports.getListCourseForUse = async function(req, res, next){
    req.listCoursesId = req.params.listCoursesId;
    next();
}

exports.createListCourse = async function(req, res, next){
    var b = req.body;
    var list = {
        title: b.title,
        desc: b.desc,
        user: "poney"
    }

    try{
        var created = await ListCourseSvc.createListCourse(list);
        return res.status(200).json({status: 200, obj: created, message: "Success created List todo"});
    }catch(e){
        return res.status(400).json(ERROR(e))
    }
}

exports.updateListCourse = async function(req, res, next){
    var id = req.params.listCoursesId || req.body._id;
    if(!id)
        return res.status(400).json(ERROR("Error: _id not defined"));
    var b = req.body;
    var list = {
        _id: id,
        title: b.title,
        desc: b.desc,
        user: "poney"
    };
    try{
        var updated = await ListCourseSvc.updateListCourse(list);
        return res.status(200).json({status: 200, obj: updated, message: "Successfully updated list"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
}

exports.deleteListCourse = async function(req, res, next){
    var id = req.params.listCoursesId;
    if(!id)
        return res.status(400).json(ERROR("Error: _id not defined"));
    try{
        var removed = await ListCourseSvc.deleteListCourse(id);
        return res.status(200).json({status: 200, obj: removed, message: "Successfully removed list"});
    }catch(e){
        return res.status(400).json(ERROR(e));
    }
}
