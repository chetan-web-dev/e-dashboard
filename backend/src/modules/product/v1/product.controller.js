const Product = require('./product.model')
// Load JWT module
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

const addProduct = async (req,resp) => {
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
            console.log(error)
            response.message = 'Validation error';
            response.result = Object.keys(error.errors);
        }
    }
    resp.send(response)
};

//if req not use then add _
const getProducts = async (_, resp) => {
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
};

const getProductDetails = async (req,resp) =>{
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
}

const deleteProduct = async (req,resp) => {
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
}

const updateProduct = async (req,resp) => {
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
};

const searchProduct = async (req, resp) => {
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
    getProducts,
    addProduct,
    deleteProduct,
    getProductDetails,
    updateProduct,
    searchProduct
}