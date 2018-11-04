var ListCourse = require("../models/listcourses.model");

var _this = this;

exports.getListCourse = async function(query, page, limit){
    var options = {
        page,
        limit
    };
    try{
        var lists = await ListCourse.paginate(query, options);
        return lists;
    }catch(e){
        throw Error("Error loaded lists todo");
    }
}

exports.createListCourse = async function(list, user){
    var newList =  new ListCourse({
        title: list.title,
        desc: list.desc,
        createdAt: new Date(),
        modifiedAt: new Date(),
        user: list.user
    });

    try{
        var savedList = await newList.save();
        return savedList;
    }catch(e){
        throw Error("Error when created list todo");
    }
}

exports.updateListCourse = async function(list){
    var id = list._id;
    try{
        var oldList = await ListCourse.findById(id)
    }catch(e){
        throw Error("list todo id is not exists")
    }

    if(!oldList)
        return false;

    try{
        for(var k in list){
            oldList[k] = list[k]
        }
        oldList.modifiedAt = new Date();
        var updatedList = await oldList.save();
        return updatedList;
    }catch(e){
        throw Error("Error when updated list todo");
    }
}

exports.deleteListCourse = async function(id){
    try{
        var removedList = await ListCourse.deleteOne({_id: id});
        if(removedList.n === 0)
            throw Error("List todo could not be deleted");
        return removedList;
    }catch(e){
        throw Error("Error occured while deleted todo");
    }
}
