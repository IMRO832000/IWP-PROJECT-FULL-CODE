var mongoose = require('mongoose');

var adminsc = new mongoose.Schema({
    usern:String,
    pwd:String
})


module.exports = mongoose.model('admin',adminsc)