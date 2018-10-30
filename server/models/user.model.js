var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        trim: true,
    },
    surname: {
        type: String,
        trim: true,
    },
    createdAt: Date,
    modifiedAt: Date,
    admin: Boolean
});

//pre-save password bcrypt
UserSchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err)
            return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePwd = function(pwd){
    return bcrypt.compareSync(pwd, this.password);
}

const User = mongoose.model('Users', UserSchema);
module.exports = User;
