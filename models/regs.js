var mongoose = require('mongoose')

var regschema = new mongoose.Schema({
    Name : String,
    Email : String ,
    password : String,
    Age : Number,
    compCourses:[{crnm:String,crdes:String,crur:String}],
    progCourses:[{pcnm:String,pcdes:String,pcur:String}],
    kart:[{kcnm:String,kcdes:String,kcur:String}],
    Username:String,
    Att:Number,
    totl:Number
})
 module.exports=mongoose.model("regs",regschema)