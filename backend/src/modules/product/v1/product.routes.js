const express = require('express');
const router = express.Router();
const controller = require('./product.controller');

router.get(
    '/', 
    controller.getProducts
);

router.post(
    '/add', 
    controller.addProduct
);

router.delete(
    '/:id', 
    controller.deleteProduct
)

router.get(
    '/:id', 
    controller.getProductDetails
)

router.put(
    '/:id', 
    controller.updateProduct       
)

router.get(
    '/:keyword',
    controller.searchProduct
)

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