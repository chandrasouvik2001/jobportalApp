const User = require("../model/UserModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const config = require("../config/config")
const Category = require("../model/categoryModel")
const jobpost = require("../model/JobModel")
const employer = require('../model/EmployerModel')
const contact= require('../model/contactmodel')

exports.login = (req, res) => {
    res.render("./admin/login", {
        title: "login page",
        message: req.flash("message"),
        error: req.flash("error")
    })
}

exports.logincreate = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(data => {
            if (data) {
                if (data && data.role == 1) {
                    const hashpassword = data.password
                    if (bcrypt.compareSync(req.body.password, hashpassword)) {
                        const tokendata = jwt.sign({ id: data._id }, config.security_key, { expiresIn: "30m" })
                        res.cookie("admintoken", tokendata)
                        res.redirect("/admin/dashboard")
                    } else {
                        req.flash("error", "Password Incorrect")
                        res.redirect("/admin/")

                    }
                } else {
                    req.flash("error", "No Admin found")
                    res.redirect('/admin')
                }
            } else {
                req.flash("error", "No Admin found")
                res.redirect('/admin/')
            }
        }).catch(err => {
            console.log(err)
        })
}

exports.dashboard = (req, res) => {
    if (req.admin) {
        User.find()
            .then(userdetails => {
                if (userdetails) {
                    res.render("./admin/dashboard", {
                        data: req.admin,
                        details: userdetails
                    })
                } else {
                    console.log("no data found")
                }
            }).catch(err => {
                console.log(err)
            })
    }
}


/*exports.user=(req,res)=>{
    res.render("./admin/user",{
        title:"user page"
    })
}*/

/*exports.employeer =(req,res)=>{
    res.render("./admin/employeer",{
        title:"employeer page"
    })
}*/

exports.category = (req, res) =>{
    Category.find()
            .then(data=>{
                res.render("./admin/category",{
                    title: "Category",
                    message: req.flash('message'),
                    error: req.flash('error'),
                    categoryData: data
                })
            }).catch(err=>{
                console.log(err);
            })
    
}

exports.category_create = (req, res) =>{
    Category.findOne({
        name: req.body.name
    }).then(data => {
        if(data) {
            req.flash("error", "Category name already exists")
            res.redirect("/admin/category")
        } else {
            
            const category = new Category({
                name: req.body.name,
                image: req.file.path
            })
            category.save((err,data) =>{
                if(!err) {
                    req.flash("message", "Category added")
                    res.redirect("/admin/category")
                } else {
                    req.flash("error", "Category not added")
                    res.redirect("/admin/category")
                }
                
            })
        }
    }).catch(error=>{
        console.log(error);
        req.flash("error", "Category not added")
        res.redirect("/admin/category")
    })
}

exports.deactive_category = (req, res) =>{
    Category.findByIdAndUpdate(req.params.id, {status: 0})
            .then(data=>{
                req.flash("message", "Category deactivated")
                res.redirect("/admin/category")
            }).catch(err=>{
                req.flash("error", "Category is not deactivated")
                res.redirect("/admin/category")
            })
}

exports.active_category = (req, res) =>{
    Category.findByIdAndUpdate(req.params.id, {status: 1})
            .then(data=>{
                req.flash("message", "Category activated")
                res.redirect("/admin/category")
            }).catch(err=>{
                req.flash("error", "Category is not activated")
                res.redirect("/admin/category")
            })
}

// exports.home_category = (req, res) =>{
//     Category.find()
//             .then(data=>{
//                 res.render("home",{
//                     categoryData: data
//                 })
//             }).catch(err=>{
//                 console.log(err);
//             })
    
// }

exports.user = (req, res) => {
    User.find({role:0}).then(result => {
        res.render("./admin/user", {
            title: "Admin | Users",
            data: req.admin,
            displayData: result
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.employeer = (req,res)=>{
    employer.find()
   .then(result => {
        res.render("./admin/employeer", {
            title: "Admin | employer",
            data: req.admin,
            displayData: result
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.jobpost = (req, res) =>{
    jobpost.find().then(result => {
        res.render("./admin/jobpost", {
            title: "Admin | Jobpost",
            data: req.admin,
            displayData: result
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.contact = (req, res) =>{
    contact.find()
    .then(result => {
        console.log(result)
        res.render("./admin/contact", {
            title: "Admin | Contact",
            data: req.admin,
            contactData: result
        })
    }).catch(err => {
        console.log(err);
    })
}


exports.deactive_user = (req, res) =>{
    User.findByIdAndUpdate(req.params.id, {status: 0})
            .then(data=>{
                req.flash("message", "User deactivated")
                res.redirect("/admin/")
            }).catch(err=>{
                req.flash("error", "User is not deactivated")
                res.redirect("/admin/user")
            })
}

exports.active_user = (req, res) =>{
    User.findByIdAndUpdate(req.params.id, {status: 1})
            .then(data=>{
                req.flash("message", "User activated")
                res.redirect("/admin/category")
            }).catch(err=>{
                req.flash("error", "User is not activated")
                res.redirect("/admin/category")
            })
}

/*exports.contact = (req,res)=>{
    contacts.find()
    res.render('./admin/contact')
}*/


exports.logout = (req, res) => {
    res.clearCookie("admintoken")
    res.redirect("/admin/")
}