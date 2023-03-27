const express = require("express")
const route=express.Router()
const admincontroller = require("../controller/admincontroller")

route.get("/",admincontroller.login)
route.post("/login_create",admincontroller.logincreate)
route.get("/dashboard",admincontroller.adminauth,admincontroller.dashboard)
route.get("/user",admincontroller.user)
route.get("/employeer",admincontroller.employeer)
route.get("/logout",admincontroller.logout)
module.exports = route