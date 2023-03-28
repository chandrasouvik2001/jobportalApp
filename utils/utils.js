exports.userauth = (req, res, next) => {
    if (req.user) {
        console.log("user req", req.user)
        next()
    } else {
        req.flash("error", "Cannot access this page first login")
        res.redirect("/login")
    }
}

exports.adminauth = (req, res, next) => {
    if (req.admin) {
        console.log("admin req", req.admin)
        next()
    } else {
        req.flash("error", "Can not access this page login first")
        res.redirect("/admin/")
    }
}