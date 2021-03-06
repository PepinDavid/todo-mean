var User = require('../models/user.model');
var bcrypt = require('bcrypt');

exports.loginUser = async function(user){
    try {
        var query = {
            username: user.username
        }
        var u = await User.findOne(query);
        if(!u)
            throw Error("User not exists")
        var compare = await bcrypt.compare(user.password, u.password);
        if(compare === true){
            return u;
        }else{
            throw Error("password is not correct");
        }
    }catch(e){
        throw Error("Error occured while logged in User");
    }
};

exports.getUsers = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var users = await User.paginate(query, options);
        return users;
    }catch(e){
        throw Error("Error occured while get Users");
    }
};

exports.getUser = async function(query){
    try{
        var user = await User.findOne(query, {password: 0});
        return user;
    }catch(e){
        throw Error("Error occured while user gets own informations")
    }
}

exports.createUser = async function(user){
    var newUser = new User({
        email: user.email,
        name: user.name,
        surname: user.surname,
        username: user.username,
        password: user.password,
        createdAt: new Date(),
        modifiedAt: new Date(),
        admin: false
    });
    try{
        var userSaved = await newUser.save();
        return userSaved;
    }catch(e){
        throw Error("Error when created user");
    }
};

exports.updateUser = async function(user){
    var id = user._id;
    try{
        oldUser = await User.findById(id);
    }catch(e){
        throw Error("User id is not exist");
    }
    if(!oldUser)
        return false;

    try{
        for(var k in user){
            oldUser[k] = user[k];
        }
        oldUser.modifiedAt = new Date();
        var updatedUser = await oldUser.save();
        var user = await User.findById(updatedUser._id, {password: 0});
        return user;
    }catch(e){
        throw Error("Error while updated user");
    }
};

exports.deleteUser = async function(id){
    try{
        var removedUser = await User.deleteOne({_id: id});
        if(removedUser.n === 0)
            throw Error("User could not be removed");
        return removedUser;
    }catch(e){
        throw Error("Error occured while removed user");
    }
}
