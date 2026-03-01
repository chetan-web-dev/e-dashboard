console.log(`Current Directory:`,__dirname)
const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

// Load JWT module
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

router.post(
    '/register', 
    controller.register
);

function verifyToken(req,resp,next) {
    let authToken = req.headers.authorization;
    if(authToken){
        authToken = authToken.split(":")[1];
        Jwt.verify(authToken,jwtKey,(err,valid)=>{
            if(err){
                resp.status(401).send({authTokenError:"Please provide valid token"});
            }else{
                next();
            }
        })
    }else{
        resp.status(403).send({authTokenError:"Please add token with header"});
    }
}

module.exports = router;