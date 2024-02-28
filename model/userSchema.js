const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    "username":{type:String},
    "email":{type:String},
    "password":{type:String},
    "wishlist":{type:Array},
    "order":{type:Array},
    "cart":{type:Array},
    "address":{type:String},
    "phoneNo":{type:String},
    "pincode":{type:String},

},{
    collection:"user"
});

module.exports = mongoose.model("user",userSchema);
