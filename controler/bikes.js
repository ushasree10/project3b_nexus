const express = require('express');
const userRoute = express.Router();
const userSchema = require('../model/userSchema');
const productSchema = require('../model/productSchema');
const adminLoginSchema = require('../model/adminLoginSchema');
const adminViewSchema = require('../model/adminViewSchema');
const mongoose = require('mongoose');

userRoute.post("/signup-user",(req,res)=>{
    userSchema.findOne({email:req.body.email},(err,data)=>{
        if(err){
            return err;
        }
        else if(data){
            res.json("user already exists");
        }
        else{
            userSchema.create(req.body,(err,data)=>{
                if(err){
                    return err;
                }else{
                    res.json(data);
                }
            })
        }})
})



//dummy
userRoute.get("/",(req,res)=>{
    userSchema.find((err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})

userRoute.get("/account/:id",(req,res)=>{
    userSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})

// in login we jus give emailid and password so i need to check if that user is present in db or not if not then alert user to signup
userRoute.post('/login-user', (req, res) => {
    const { email, password } = req.body;
    userSchema.findOne({ email: email })
        .then((user) => {
            if (user) {
                if (user.password === password) {
                    res.json(user._id);
                    // res.json("user logged in");
                }   
                else {
                    res.json("password incorrect");
                }
            }
            else {
                res.json("user not registered");
            }
        }).catch((err) => {
            console.log(err);
    })
});

userRoute.route("/update-user/:id")
.get((req,res)=>{
    userSchema.find(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })

}).put((req,res)=>{
    userSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),{
        $set:req.body
    },(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        } 
    })
})


userRoute.delete("/delete-user/:id",(req,res)=>{
    userSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;

        }else{
            res.json(data);
        }
    })
})


//product route

//dummy
userRoute.get("/getbikes",(req,res)=>{
    productSchema.find((err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})

userRoute.get("/orderedProduct/:id",(req,res)=>{
    productSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})

//for getting product by company name
userRoute.get('/product/:company', (req, res) => {
    const company  = req.params.company;
    productSchema.find({ company: company })
        .then((product) => {
            if (product) {
                res.json(product);
            }
            else {
                Promise.reject();
            }
        }).catch((err) => {
            console.log(err);
    })
});


//cart
//to add the object id of product to respective user cart
userRoute.post("/addtocart",(req,res)=>{
    const {userid,productid} = req.body;
    userSchema.findByIdAndUpdate(mongoose.Types.ObjectId(userid),{
        $push:{cart:productid}
    },(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})


//to delete the product from cart
userRoute.post("/deletefromcart",(req,res)=>{
    const {userid,productid} = req.body;
    userSchema.findByIdAndUpdate(mongoose.Types.ObjectId(userid),{
        $pull:{cart:productid}
    },(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})

//to add the object id of product to respective user wishlist
userRoute.post("/addtowishlist",(req,res)=>{
    const {userid,productid} = req.body;
    userSchema.findByIdAndUpdate(mongoose.Types.ObjectId(userid),{
        $push:{wishlist:productid}
    },(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})



//to get the wishlist of the user
userRoute.get("/wishlist/:id",(req,res)=>{
    userSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data.wishlist);
        }
    })
})


//to delete the product from wishlist
userRoute.post("/deletefromwishlist",(req,res)=>{
    const {userid,productid} = req.body;
    userSchema.findByIdAndUpdate(mongoose.Types.ObjectId(userid),{
        $pull:{wishlist:productid}
    },(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})

//order
//to add the object id of product to respective user order

userRoute.post("/addtoorder",(req,res)=>{
    const {userid,productid} = req.body;
    userSchema.findByIdAndUpdate(mongoose.Types.ObjectId(userid),{
        $push:{order:productid}
    },(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})

//to get the order of the user
userRoute.get("/order/:id",(req,res)=>{
    userSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data.order);
        }
    })
})





//admin login
userRoute.get("/admin",(req,res)=>{
    adminLoginSchema.find((err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})


userRoute.post('/login-admin', (req, res) => {
    const { adminemail,adminpassword } = req.body;
    adminLoginSchema.findOne({ adminemail: adminemail })
        .then((user) => {
            if (user) {
                if (user.adminpassword === adminpassword) {
                    res.json(user._id);
                    // res.json("user logged in");
                }   
                else {
                    res.json("password incorrect");
                }
            }
            else {
                res.json("admin not registered");
            }
        }).catch((err) => {
            console.log(err);
    })
});


userRoute.post("/admin-product",(req,res)=>{
    productSchema.create(req.body,(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})


userRoute.get("/admin-account/:id",(req,res)=>{
    adminLoginSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})


//admin view 
userRoute.get("/admin-feedback",(req,res)=>{
    adminViewSchema.find((err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})

//send feedback to database
userRoute.post("/user-feedback",(req,res)=>{
    adminViewSchema.create(req.body,(err,data)=>{
        if(err){
            return err;
        }else{
            res.json(data);
        }
    })
})

//get feedback by date
userRoute.post("/admin-feedback-date",(req,res)=>{
    adminViewSchema.find({date:req.body.date},(err,data)=>{
        if(err){
            return err;
        }else if(data.length === 0){
            res.json("No feedbacks on this date");
        }else{
            res.json(data);
        }
    })
})


module.exports = userRoute;
