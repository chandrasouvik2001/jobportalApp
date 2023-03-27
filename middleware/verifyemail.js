// const User = require("../model/UserModel")

// exports.checkduplicate=(req,res,next)=>{
    
//     User.findOne({email:req.body.email})
//     .then(data=>{
//         if(data){
//             req.flash("message","email already exist")
//             res.redirect("/register")
//         }else{
//             next()
//         }
//     //    const{password,cpassword}=req.body
//     //    if(password!== cpassword){
//     //     req.flash("message","Password Incorrrect")
//     //         res.redirect("/register")
//     //    }
       
//     }).catch(err=>{
//         console.log(err)
//     })

// }