const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    status:Boolean,
    createdAt:Date,
    updatedAt:Date
},{ timestamps: false })
module.exports = mongoose.model('users',userSchema)
