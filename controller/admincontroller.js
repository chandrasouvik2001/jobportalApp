const User = require("../model/UserModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const config = require("../config/config")


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


exports.user=(req,res)=>{
    res.render("./admin/user",{
        title:"user page"
    })
}

exports.employeer =(req,res)=>{
    res.render("./admin/employeer",{
        title:"employeer page"
    })
}

exports.logout = (req, res) => {
    res.clearCookie("admintoken")
    res.redirect("/admin/")
}