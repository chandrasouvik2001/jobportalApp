const express = require("express")
const route=express.Router()
const admincontroller = require("../controller/admincontroller")
const utils = require("../utils/utils")

route.get("/", admincontroller.login)
route.post("/login_create", admincontroller.logincreate)
route.get("/dashboard", utils.adminauth, admincontroller.dashboard)
route.get("/user", admincontroller.user)
route.get("/employeer", admincontroller.employeer)
route.get("/logout", admincontroller.logout)
module.exports = route