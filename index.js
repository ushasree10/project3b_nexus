const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bikes = require('./controler/bikes');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://adithgowda06:adithgowda@cluster3.wkfn2g8.mongodb.net/showroom");

var db = mongoose.connection;
db.on('open',()=>console.log("connected to db"));
db.on('error',()=>console.log("error connecting to db"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/bikes",bikes);

app.listen(4000,()=>console.log("server started on port 4000"));

//http://localhost:4000/bikes