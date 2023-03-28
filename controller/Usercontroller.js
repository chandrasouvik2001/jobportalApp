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
exports.post_job = (req, res) => {
    res.send("<h1> You Can not Access this page you are a user </h1>")
}

exports.register = (req, res) => {
    res.render("register", {
        title: "register page",
        data: req.user,
        message: req.flash("message"),
        error: req.flash("error")
    })
}

exports.register_create = (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    })
    user.save().then(data => {
        req.flash("message", "User registered successfully")
        res.redirect("/login")
    }).catch(err => {
        req.flash('error', "Error in saving data")
        res.redirect('/register')
    })
}

exports.login = (req, res) => {

    loginData = {}
    loginData.email = req.cookies.email ? req.cookies.email : undefined
    loginData.password = req.cookies.password ? req.cookies.password : undefined

    res.render("login", {
        title: "loginpage",
        message: req.flash("message"),
        error: req.flash("error"),
        data: loginData
    })
}

exports.login_create = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(data => {
            if (data && data.role == 0) {
                const hashpassword = data.password
                if (bcrypt.compareSync(req.body.password, hashpassword)) {
                    const tokendata = jwt.sign({ id: data._id, name: data.name }, config.security_key, { expiresIn: "30m" })
                    res.cookie("usertoken", tokendata)

                    if (req.body.rememberme) {
                        res.cookie('email', req.body.email)
                        res.cookie('password', req.body.password)
                    }
                    res.redirect("/dashboard")
                } else {
                    req.flash("error", "Password Incorrect")
                    res.redirect("/login")
                }

            } else {
                req.flash("error", "No data found with this email id")
                res.redirect("/login")
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


exports.logout = (req, res) => {
    res.clearCookie("usertoken")
    res.redirect("/")
}


