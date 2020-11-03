var mongoose = require('mongoose');

var courseContent = new mongoose.Schema({
    crsname:String,
    crsimg:String,
    crsintro:String,
    crscont:String

})


module.exports = mongoose.model('crscon',courseContent)