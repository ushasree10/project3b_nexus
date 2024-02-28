const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    "company":{type:String},
    "bikename":{type:String},
    "bikeprice":{type:String},
    "bikerating":{type:String},
    "kmpl":{type:String},
    "bikecc":{type:String},
    "description":{type:String},
    "image":{type:String},
},{
    collection:"product"
});

module.exports = mongoose.model("product",productSchema);