var ListTodo = require("../models/listtodo.model");

var _this = this;

exports.getListTodo = async function(query, page, limit){
    var options = {
        page,
        limit
    };
    try{
        var lists = await ListTodo.paginate(query, options);
        return lists;
    }catch(e){
        throw Error("Error loaded lists todo");
    }
}

exports.createListTodo = async function(list, user){
    var newList =  new ListTodo({
        title: list.title,
        desc: list.desc,
        createdAt: new Date(),
        modifiedAt: new Date(),
        status: false,
        user: list.user
    });

    try{
        var savedList = await newList.save();
        return savedList;
    }catch(e){
        throw Error("Error when created list todo");
    }
}

exports.updateListTodo = async function(list){
    var id = list._id;
    try{
        var oldList = await ListTodo.findById(id)
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

exports.deleteListTodo = async function(id){
    try{
        var removedList = await ListTodo.deleteOne({_id: id});
        if(removedList.n === 0)
            throw Error("List todo could not be deleted");
        return removedList;
    }catch(e){
        throw Error("Error occured while deleted todo");
    }
}
