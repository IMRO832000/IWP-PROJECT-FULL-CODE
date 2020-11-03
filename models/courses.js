var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    CrsName:String,
    imageurl:String,
    description:String
})


module.exports = mongoose.model('courses',courseSchema)
