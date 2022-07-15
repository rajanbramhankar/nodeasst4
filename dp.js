const exp = require("express").Router()
const users=require('../db')
const {check,validationResult}=require('express-validator')
exp.post('/signup',[
    check("email","Please Provide a Valid Mail")
    .isEmail(),
    check("password","Please Provide a Valid Password of Min 5 Character")
    .isLength({
        min:6
    })
],(req,res)=>{
    const{email,password} = req.body;
    //validating our inputs
    const err=validationResult(req)
    if(!err.isEmpty()){
        return res.status(400).json({
            err:err.array()
        });
    }
    //validating if the user exists or not.
    let user = users.find((user)=>{
        return user.email==email;
    })
    if(user){
        res.status(400).json({
            "errors":[
                {
                    "msg":"The user is Already Registered"
                }
            ]
        })
    }
    console.log(email,password)
    res.send("Auth is working")
})
module.exports = exp;
