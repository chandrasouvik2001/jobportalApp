const jobmodel= require('../model/JobModel')


exports.register = (req, res) => {
    const jobpost = new jobmodel({
       category : req.body.category,
        title: req.body.title,
        cmp: req.body.cmp,
        cmplogo:req.file.filename,
        nature:req.body.nature,
        short:req.body.short,
        full:req.body.full,
        salary:req.body.salary,
    })
    jobpost.save()

    .then(pdata=>{
        if(pdata){
            console.log(`job data posted`)
            res.redirect('/')
        }
        else{
            console.log(`error while posting`);
        }
    })
       
    }
