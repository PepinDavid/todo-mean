var mongoose = require('mongoose');
var mongoosePagination = require('mongoose-paginate');

var ToDoSchema = new mongoose.Schema({
    title: String,
    desc: String,
    createdAt: Date,
    status: Boolean,
    user: String,
    modifiedAt: Date,
    idList: String,
    files: {
        type: Array,
        required: false
    }
});

ToDoSchema.plugin(mongoosePagination);
const ToDo = mongoose.model('Todo', ToDoSchema);

module.exports = ToDo;
