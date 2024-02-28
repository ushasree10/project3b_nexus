const mongoose = require('mongoose');

const adminViewSchema = new mongoose.Schema({
    "userid":{type:String},
    "username":{type:String},
    "message":{type:String},
    "date":{type:String}
},{
    collection:"adminview"
});

module.exports = mongoose.model("adminview",adminViewSchema);
