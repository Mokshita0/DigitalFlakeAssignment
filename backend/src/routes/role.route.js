const express=require("express");
const RoleController =require("../controller/role.controller");


const route=express.Router();
const rc=new RoleController;


route.get("/roles",rc.getAllRoles);
route.post("/create",rc.createRole);
route.put("/:id",rc.editRole);
route.delete("/:id",rc.deleteRole);
route.get("/search/:name",rc.searchRoles);
route.get("/:id",rc.getRolebyId);

module.exports=route;