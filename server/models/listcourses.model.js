var mongoose = require('mongoose');
var mongoosePagination = require('mongoose-paginate');

var ListCoursesSchema = new mongoose.Schema({
    title: String,
    desc: String,
    createdAt: Date,
    user: String,
    modifiedAt: Date
});

ListCoursesSchema.plugin(mongoosePagination);
const ListCourses = mongoose.model('ListCourses', ListCoursesSchema);

module.exports = ListCourses;
