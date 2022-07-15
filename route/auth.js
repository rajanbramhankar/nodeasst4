const exp = require("express").Router()
const {check,validationResult}=require('express-validator')
exp.post('/signup',[
    check("email","Please Provide a Valid Mail")
    .isEmail(),
    check("password","Please Provide a Valid Password of Min 5 Character")
    .isLength({
        min:6
    })
],(req,res)=>{
    const{email,password} = req.body
    const err=validationResult(req)
    if(!err.isEmpty()){
        return res.status(400).json({
            err:err.array()
        });
    }
    console.log(email,password)
    res.send("Auth is working")
})


module.exports = exp;
