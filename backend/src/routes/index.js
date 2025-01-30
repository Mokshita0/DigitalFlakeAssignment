const express=require("express");
const userroute =require( "./user.route.js");
const roleroute =require("./role.route.js");
const UserController = require("../controller/user.controller");

const route=express.Router();
const uc=new UserController();

route.post("/login",uc.login);
route.post("/createAdmin",uc.createAdmin);

route.use('/user',userroute);
route.use('/role',roleroute);

module.exports=route;