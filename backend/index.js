const express = require("express");
const cors = require("cors");
const dotenv =require("dotenv");
const connectDB = require("./config/mongoose");
const route =require( "./src/routes/index")
const app=express();
dotenv.config();
const port=process.env.PORT||8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded())
//routes
app.use('/api',route);
app.get('/',(req,res)=>{
    res.send("welcome to app")
});



app.listen(port,(err)=>{
    if(err){
        console.log("Issue in launching server:",err)
    }
    console.log("server is up on port:"+port)
    connectDB();
});

