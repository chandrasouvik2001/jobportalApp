const User = require("../model/UserModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config/config")

exports.home = (req, res) => {
    res.render("home", {
        title: "home page",
        data: req.user
    })
 }

 exports.about = (req, res) => {
    res.render("about", {
        title: "about page"
    })
  }

  exports.contact = (req, res) => {
    res.render("contact", {
        title: "contact page"
    })
   }

  exports.joblist = (req, res) => {
    res.render("job", {
        title: "job page"
    })
   }
   exports.jobdetails = (req, res) => {
    res.render("jobdetails", {
        title: "jobdetails page"
    })
   }

//    exports.post_job = (req, res) => {
//     res.render("post_job", {
//         title: "job_post_page",

//     })
// }
exports.post_job =(req,res)=>{
    res.send("<h1> You Can not Access this page you are a user </h1>")
}

 exports.register = (req, res) => {
    res.render("register", {
        title: "register page",
        data: req.user,
        message1: req.flash("message1")
    })
 }

 exports.register_create=(req,res)=>{
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
    })
    user.save().then(data=>{
        req.flash("message","user register successfully")
        res.redirect("/login")
    }).catch(err=>{
        console.log("error please check",err)
    })
 }

 exports.login = (req, res) => {
    res.render("login", {
        title: "loginpage",
        message: req.flash("message"),
        message1: req.flash("message1"),
        message2: req.flash("message2"),
        data: req.user
    })
  }

  exports.login_create = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(data => {
               if(data && data.role==0){ 
                const hashpassword = data.password
                if (bcrypt.compareSync(req.body.password, hashpassword)) {
                    const tokendata = jwt.sign({ id: data._id,name:data.name }, config.security_key, { expiresIn: "30m" })
                    res.cookie("usertoken", tokendata)
                    res.redirect("/dashboard")
                }else {
                    req.flash("message1", "no user found on this email")
                    res.redirect("/login")
                }

               }else{
                console.log("error whrn create login")
               }
            }).catch(err => {
            console.log("error", err)
        })

   }

   exports.dashboard = (req, res) => {
    if (req.user) {
        User.find()
            .then(userDetails => {
                if (userDetails) {
                    res.render('dashboard', {
                        data: req.user,
                        details: userDetails,
                        //docs:User.find()            
                    })
                } else {
                    console.log("No data found");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
  }


  exports.userauth = (req, res, next) => {
    if (req.user) {
        console.log("user req",req.user)
        next()
    } else {
        req.flash("message2", "cannot access this page")
        res.redirect("/login")
    }
  }

  exports.logout=(req,res)=>{
    res.clearCookie("usertoken")
    res.redirect("/")
  }


