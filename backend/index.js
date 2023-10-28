const path = require('path');
require('dotenv').config({path:path.resolve(__dirname, './.env')});
const express = require('express');
const cors = require("cors");
require('./db/config')
const User = require('./db/User')
const Product = require('./db/Product')
const app = express(); //execute express;
app.use(express.json()); //execute
app.use(cors()); //execute

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

app.post("/register", async (req, resp) => {
    const response = { status: false, error: true, result: null, requestBody: null, message: null };
    let result = null;
    try {
        //req.body.createdAt = formattedDateTime();
        // Depending on timezone, your results will vary
        const event = new Date();
        //console.log(event.toLocaleTimeString('en-US'));

        req.body.createdAt = new Date();
        const user = new User(req.body);
        result = await user.save();
        result = result.toObject();
        delete result.password;

        if (typeof result._id != undefined) {
            response.message = 'User Registered';
            response.status = true;
            response.error = false;
        }
        response.result = result;
    } catch (error) {
        if (error.name == 'ValidationError') {
            response.result = Object.keys(error.errors);
        }
    }
    if (result != null) {
        Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                resp.send({ response });
            } else {
                resp.send({ response, auth: `bearer:${token}` });
            }
        })
    } else {
        resp.send({ response });
    }
    // resp.send(response)
})

app.put('/update/profile/:id', verifyToken, async (req,resp)=>{
    console.log(req.body)
    const response = { status: false, error: true, result: null, requestBody: null, message: null };
    try{
        let resData = await User.updateOne({
                '_id':req.params.id
            },
            {
                $set:req.body
            }
        );
        if(resData.matchedCount){
            response.error = false;
            response.status = true;
        }
        if(resData.matchedCount && resData.modifiedCount){
            response.message = 'User profile updated successfully.';
        }
        response.result = resData;
        console.log(resData)
    }catch(error){
        console.log(error)
    }
    resp.send(response)
});


app.post('/login', async (req, resp) => {
    const response = { status: false, error: true, result: null, requestBody: null, message: null };
    let user = null;
    try {
        if (req.body.email && req.body.password) {
            user = await User.findOne(req.body).select("-password");
            response.message = 'No user found';
            if (typeof user._id != undefined) {
                response.message = 'User Found';
                response.status = true;
                response.error = false;
            }
            response.result = user;
        } else {
            response.message = 'Requested data invalid';
        }
        response.requestBody = req.body;
    } catch (error) {
        /*if(error.name=='ValidationError'){
            response.result = Object.keys(error.errors);
        }*/
    }

    if (user != null) {
        Jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                resp.send({ response });
            } else {
                resp.send({ response, auth: `bearer:${token}` });
            }
        })
    } else {
        resp.send({ response });
    }

});

app.post('/product/add', verifyToken, async (req, resp) => {
    const response = { status: false, error: true, result: null, requestBody: null, message: null };
    try {
        req.body.createdAt = formattedDateTime();
        let product = new Product(req.body)
        let result = await product.save();
        response.message = 'Something wrong';
        if (typeof result._id != undefined) {
            if (typeof result._id != undefined) {
                response.message = 'Product added successfully';
                response.status = true;
                response.error = false;
            }
            response.result = result;
        }
        response.requestBody = req.body;
    } catch (error) {
        if (error.name == 'ValidationError') {
            response.message = 'Validation error';
            response.result = Object.keys(error.errors);
        }
    }
    resp.send(response)
})

//if req not use then add _
app.get('/products', verifyToken, async (_, resp) => {
    const response = { status: false, error: true, result: null, requestBody: null, message: null };
    let products = null;
    try {
        products = await Product.find({}).sort( {_id:-1} );
        response.message = 'Product list not found';
        if (products.length > 0) {
            response.message = 'Product list found';
            response.status = true;
            response.error = false;
            response.result = products;
        }
    } catch (error) {
        console.log(error.errors)
    }

    if (products != null) {
        Jwt.sign({ products }, jwtKey, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                resp.send({ response });
            } else {
                resp.send({ response, auth: token });
            }
        })
    } else {
        resp.send({ response });
    }
});

app.delete('/product/delete/:id', verifyToken, async (req, resp) => {
    console.log(req.params.id)
    const response = { status: false, error: true, result: null, requestBody: null, message: null };
    try {
        if (req.params.id) {
            const res = await Product.deleteOne({ _id: req.params.id })
            if (res.deletedCount) {
                response.status = true;
                response.result = res;
                response.error = false;
            }
        }
    } catch (error) {
        console.log(error.errors)
    }
    resp.send(response);
})

app.get('/product/details/:id', verifyToken, async (req, resp) => {
    console.log(req.params.id)
    const response = { status: false, error: true, result: null, requestBody: null, message: null };
    try {
        const data = await Product.findById(req.params.id).select([
            '_id', 'name', 'price', 'category', 'company'
        ]);
        if (Object.keys(data).length) {
            response.status = true;
            response.error = false;
            response.result = data;
        }
    } catch (error) {
        console.log(error.errors)
    }
    resp.send(response)
})

app.put('/product/update/:id', verifyToken, async (req, resp) => {
    console.log(req.params.id)
    const response = { status: false, error: true, result: null, requestBody: null, message: null };
    let data = null;
    try {
        req.body.modifiedAt = formattedDateTime();
        data = await Product.updateOne({
            '_id': req.params.id,
        },
        {
            $set: req.body
        });
        if (data.modifiedCount && data.matchedCount) {
            response.status = true;
            response.error = false;
        }
        response.result = data;
    } catch (error) {
        console.log(error.errors)
    }

    if (data != null) {
        Jwt.sign({ data }, jwtKey, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                resp.send({ response });
            } else {
                resp.send({ response, auth: token });
            }
        })
    } else {
        resp.send({ response });
    }

    //resp.send(response)
});

app.get('/product/search/:keyword', verifyToken, async (req, resp) => {
    const response = { status: false, error: true, result: null, requestBody: null, message: null };
    try {
        let data = await Product.find({
            '$or': [
                { name: { $regex: req.params.keyword } },
                { price: req.params.keyword },
                { category: { $regex: req.params.keyword } },
                { company: { $regex: req.params.keyword } }
            ]
        })
        //if(data !='')
        {
            response.status = true;
            response.error = false;
            response.result = data;
        }
    } catch (error) {
        console.log(error.errors)
    }
    resp.send(response);
});

const formattedDateTime = () => {
    const date = new Date();
    let formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return `${formattedDate} ${formattedTime}`;
}

function verifyToken(req,resp,next){
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
app.listen(7000); //Server port listen