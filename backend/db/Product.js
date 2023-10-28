const mongoose = require('mongoose');
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const productSchema = new mongoose.Schema({
    name:{
        type:"string",
        required:true
    },
    price:'string',
    description:'string',
    discountPercentage:Number,
    rating:Number,
    stock:Number,
    brand:'string',
    company:'string',
    category:'string',
    thumbnail:[],
    images:[],
    status:Boolean,
    createdAt:Date,
    createdBy:ObjectId,
    modifiedAt:Date,
    modifiedBy:'string'
});
module.exports = mongoose.model('products',productSchema)