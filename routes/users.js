var express = require('express');
var router = express.Router();
const sha1 = require('sha1');
const userModel = require('../models/userModel');

router.post('/new', async (req,res,next)=>{
  try{
    let object = { 
      user : req.body.user,
      password : sha1(req.body.password),
      role : 2
    }
    let result = await userModel.createUser(object)
    console.log(req.body)
    
    res.json({status : true, message : 'Usuario registrado correctamente'})
  }catch(error){
    console.log(error)
    res.status(500).json({status : false, message : error})
  }
})

module.exports = router;
