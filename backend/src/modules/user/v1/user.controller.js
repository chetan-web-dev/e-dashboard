const bcrypt = require('bcrypt');
const User = require('./user.model')
// Load JWT module
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

const register = async (req, res) => {
    const response = { success: false, message: null, data: null, token: null };
    let result = null;
    try {
        //req.body.createdAt = formattedDateTime();
        // Depending on timezone, your results will vary
        const event = new Date();
        //console.log(event.toLocaleTimeString('en-US'));
    
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        console.log(hashedPassword)

        req.body.createdAt = new Date();
        //req.body.password = hashedPassword;
        const user = new User(req.body);
        console.log(user)

        result = await user.save();
        result = result.toObject();
        delete result.password;

        if (typeof result._id != undefined) {
            response.message = 'User registered successfully';
            response.success = true;
        }
        response.data = result;
        return res.status(201).json(response);
    } catch (error) {
        console.log('error::')
        console.log(error)
        if (error.name == 'ValidationError') {
            response.result = Object.keys(error.errors);
        }
        res.status(500).json(response);
    }
};

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

const formattedDateTime = () => {
    const date = new Date();
    let formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return `${formattedDate} ${formattedTime}`;
}

module.exports = {
    register
}