const express = require("express")
const { verify } = require("jsonwebtoken")
const route=express.Router()
const controller = require("../controller/Usercontroller")
const middleware =require("../middleware/verifyemail")

route.get("/",controller.home)
route.get("/about",controller.about)
route.get("/contact",controller.contact)
route.get("/joblist",controller.joblist)
route.get("/jobdetails",controller.jobdetails)
route.get("/post_job",controller.post_job)

route.get("/register",controller.register)
route.post("/register_create",controller.register_create)
route.get("/login",controller.login)
route.post("/login_create",controller.login_create)
route.get("/dashboard",controller.userauth,controller.dashboard)
route.get("/logout",controller.logout)

module.exports = route