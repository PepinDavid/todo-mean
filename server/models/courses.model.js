var mongoose = require('mongoose');
var mongoosePagination = require('mongoose-paginate');

var CoursesSchema = new mongoose.Schema({
    title: String,
    desc: String,
    createdAt: Date,
    user: String,
    modifiedAt: Date,
    idListCourses: String,
    files: {
        type: Array,
        required: false
    }
});

CoursesSchema.plugin(mongoosePagination);
const Courses = mongoose.model('Courses', CoursesSchema);

module.exports = Courses;
