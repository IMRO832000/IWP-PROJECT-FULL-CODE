var express = require('express');
var mongoose = require('mongoose')
//mongoose.connect("mongodb://localhost/dbk9")

mongoose.connect('mongodb+srv://rohit123:pwd123@cluster0.b8bzw.mongodb.net/prj?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => console.log('MongoDB Atlas connected...')).catch((err) => console.log(err));
var app=express();
var bodyparser=require('body-parser')
var metr = require('method-override')
app.use(bodyparser.urlencoded({extended:true}))
app.set("view engine","ejs")
mongoose.set('useFindAndModify', false);
app.use(express.static("public"))
app.use(metr("_method"));
var courses = require('./models/courses')
var regs = require('./models/regs')
var crscon = require('./models/coursecontent')
var admin = require('./models/admin')
const nodemailer = require('nodemailer');







var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'rohithkrishna.vit2000@gmail.com',
        pass: 'ldtcgkgdgsvnbsig'
    }
});
var pt ='D://5thsem//certificates//'
app.post("/mail/:id/:cn", function(req,res){
    regs.findById(req.params.id, function(err,f){
        if(err){
            console.log(err)
        }
courses.findOne({CrsName:req.params.cn}, function(err1,f1){


    console.log('Mail sent');
    transporter.sendMail({
    from: 'rohithkrishna.vit2000@gmail.com',
      to: f.Email,
      subject: f1.CrsName+"-certificate",
      text: 'Thank you for completing the course '+ f.Name,
      attachments:[
          {
              path:pt+f.Name+f1.CrsName+".pdf"
          }
      ]
    });
    



})
       

res.redirect("/usrpg/"+f._id)        
    })


})





app.get("/hmp", function(req,res){

res.render("index1")

})


app.get("/login", function(req,res){
    res.render("login")
})

app.get("/reg", function(req,res){
    res.render("reg")
})


app.post("/hmp", function(req,res){
    var nm = req.body.inputName;
    var email= req.body.inputEmail3;
    var password= req.body.inputPassword3
    var age = req.body.age;
    var usrn = req.body.username;
    var regtd = {Name: nm, Email:email,password:password,Age:age,Username:usrn};
    regs.create(regtd, function(err,f){
        if(err){
            res.send(err)
        }
        else{ console.log(f);
        res.redirect("/login")
        }
    })
    

})


app.get("/prog/:id",(req,res)=>{
    regs.findById(req.params.id,(err,f)=>{
        if(err){
            res.send(err)
        }
        else{
            res.render("prog",{usr:f})
        }
    })
})
app.get("/cert/:id/:crnm", function(req,res){
    var id =req.params.id;
    var cn= req.params.crnm;
    regs.findById(id,function(err,f){

        if(err){
            console.log(err)
        }
        else{
    
        courses.findOne({CrsName:cn}, function(err1,f1){
            if(err1){
                console.log(err1)
            }
            else{
                res.render("cert",{usr:f,crs:f1})
            }
        })

        }
    })
})


app.get("/compc/:id",function(req,res){
    regs.findById(req.params.id,function(err,f){
        if(err){
            res.send("error")
        
        }
        else{
            res.render("compc",{usr:f})
        }
    })
})

app.put("/update/:id/:cn",function(req,res){
courses.findOne({CrsName:req.params.cn},function(err,f){
    if(err){res.send("error")}
    else{  var de=f.description;
        var ur=f.imageurl;
        var nml=f.CrsName;
        var upd={pcnm:nml,pcdes:de,pcur:ur};
        regs.findByIdAndUpdate(req.params.id,{$push:{progCourses:upd}},function(err1,f1){
if(err1){
    res.send("error")
}
else{
    res.redirect("/prog/"+f1._id);
}
 })
    }
})

})


app.put("/kartupd/:id/:cid", function(req,res){
courses.findById(req.params.cid, function(err,f){
if(err){
    res.send(err)
}
else{
var cnm = f.CrsName;
var ur= f.imageurl;
var dc = f.description;
var upd ={ kcnm:cnm,kcdes:dc,kcur:ur};
regs.findByIdAndUpdate(req.params.id, {$push:{kart:upd}}, function(err1,f1){
    if(err1){
        res.send(err1)
    }
    else{
        res.redirect("/paidc/"+f1._id)
    }
})
}

})

})




app.get("/kart/:id",function(req,res){
regs.findById(req.params.id,function(err,f){
    if(err){console.log(err)}
    else{
     res.render("kart",{usr:f})
            
        
    }
})
})


app.get("/paidc/:id",function(req,res){
    regs.findById(req.params.id,function(err,f){
        if(err){
            res.send("error!not found")
        }
        else{
            courses.find({},function(err1,f1){
         if(err1){console.log(err)}
         else{
             res.render("paidc",{usr:f,crs:f1})
         }

        })
            
        }
    })
})
app.get("/usrpg/:id",function(req,res){
    regs.findById(req.params.id,function(err,f){
        if(err){
            res.send(err)
        }
        else{
            res.render("userpg",{usr:f})
        }
    })
})
app.post("/login",function(req,res){
    var nm = req.body.nm;
    var pwd = req.body.pw;
    regs.findOne({Username:nm,password:pwd},function(err,f){
        if(err){res.send("Sorry these credentials are invalid")
                   res.redirect("/login")}
        else{
            res.redirect("/usrpg/"+f._id)
        }
    })
})



app.put("/compcd/:id/:cn", function(req,res){
    courses.findOne({CrsName:req.params.cn}, function(err,f){
        if(err){
            console.log(err)
        }
        else{
            var nm = f.CrsName;
            var dc = f.description;
            var ur = f.imageurl;
            var cpd= {crnm:nm,crdes:dc,crur:ur};
            regs.findByIdAndUpdate(req.params.id,{$push:{compCourses:cpd}},function(err1,f1){
                if(err1){console.log(err1)}
                else{
                    res.redirect("/compc/"+f1._id)
                }
            }) 
            
        }
    })
    })

app.get("/crspg/:id/:cn", function(req,res){
regs.findById(req.params.id,function(err,f){
    if(err){
        console.log(err)
    }
    else{
        crscon.findOne({crsname:req.params.cn}, function(err1,f1){
            if(err1){
                console.log(err1)
            }
            else{
                res.render("crspg",{usr:f,crs:f1})
            }
        })
    }
})
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/about/:id",(req,res)=>{
    regs.findById(req.params.id,function(err,f){
        if(err){
            res.send(err);
        }
        else{
            res.render("abouti",{usr:f})
        }
    })
})

app.get("/adlog", function(req,res){
    res.render("adlog")
})
app.post("/adlog", function(req,res){
    var un = req.body.uname;
    var pw = req.body.pwd

    admin.findOne({usern:un,pwd:pw}, function(err,f){
        if(err){
            res.send(err)
        }
        else{
            res.redirect("/admin")
        }
    })
})

app.get("/admin", function(req,res){
    regs.find({}, function(err,f){
        if(err){res.send(err)}
        else{
            res.render("admin",{ad:f})
        }
    })
})

app.put("/attup/:id", function(req,res){
    regs.findById(req.params.id, function(err,f){
        if(err){
            console.log(err)
        }
     else{
         var tot = req.body.tot;
         var att = req.body.Att;
         regs.findByIdAndUpdate(req.params.id,{$set:{Att:att,totl:tot}}, function(err1,f1){
             if(err1){
                 console.log(err1)
             }
             else{
                 res.redirect("/admin")
             }
         })
     }

    })
})



app.get("/freec",(req,res)=>{
    res.render("freecourses")
})

app.get("/topcourses",(req,res)=>{
    res.render("topcourses")
})

app.get("/newc",(req,res)=>{
    res.render("new")
})

app.get("/new1c",(req,res)=>{
    res.render("new1")
})

app.listen(3000, function(){
    console.log("server has started")

})
