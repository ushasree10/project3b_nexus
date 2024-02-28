const mongoose = require('mongoose');

const adminLoginSchema = new mongoose.Schema({
    "adminname":{type:String},
    "adminemail":{type:String},
    "adminpassword":{type:String},
    "adminaddress":{type:String},
    "adminpincode":{type:String},
    "adminphoneno":{type:String},

},{
    collection:"adminlogin"
});

module.exports = mongoose.model("adminlogin",adminLoginSchema);
