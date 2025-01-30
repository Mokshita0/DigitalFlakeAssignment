const express=require("express");
const UserController =require("../controller/user.controller");


const route=express.Router();
const uc=new UserController;


route.get("/users",uc.getAllUsers);
route.post("/create",uc.createUser);
route.put("/:id",uc.editUser);
route.delete("/:id",uc.deleteUser);
route.get("/:id",uc.getUserbyId);
route.get("/search/:name",uc.searchUsers);

module.exports=route;