const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const bcrypt = require("bcryptjs")
const session =require("express-session")
const flash=require("connect-flash")
const cookieParser =require("cookie-parser")
const userauth=require("./middleware/userauth")
const adminauth =require("./middleware/adminauth")
const app = express()
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(flash());
app.use(cookieParser());
app.use(userauth.userauth)
app.use(adminauth.adminauth)

app.use(session({
    cookie: {
        maxAge: 60000
    },
    secret: "souvik230598",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine","ejs")
app.set("views","views")






//user route
const route = require("./route/user")
app.use(route)

// Employee route
// const route =require("./route/employeer")
// app.use(route)

//admin route
const adminroute =require("./route/admin")
app.use("/admin",adminroute)

const port = process.env.PORT || 5677
const dbDriver ="mongodb+srv://souvik:iKG9viCnqF3hBPWh@cluster0.zraidlb.mongodb.net/Final_project"
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    app.listen(port,()=>{
        console.log("db connected")
        console.log(`the server is running on http://localhost:${port}`)
    })
}).catch(err=>{
    console.log("db not conneted")
    console.log(err)
})




