const express = require('express');
const router = express.Router();
const sha1 = require('sha1')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const userModel = require('../models/userModel')

router.post('/', async (req, res, next)=>{
    try{
        let user = req.body.user;
        let password = req.body.password;
        console.log(req.body)
        let result = await userModel.getUserByUsernameAndPassword(user, sha1(password))
        
        if(result.length > 0){
            payload = {} 
            const privateKey = fs.readFileSync('./claves/privada.pem','utf-8')

            let signOptions = {
                expiresIn : '2h',
                algorithm : 'RS256'
            }
            if(result[0].role == 1){
                payload = {id : result[0].id, role : 'admin'}
            }else{
                payload = {id : result[0].id, role : 'user'}
            }

            const token = jwt.sign(payload, privateKey, signOptions)
            res.json({status : true, JWT: token})

        }else{
            res.status(401).json({status : true, message : 'Unauthorized', JWT : null})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({status : false})
    }
})

module.exports = router;