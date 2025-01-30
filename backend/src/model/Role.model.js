const mongoose=require("mongoose");

const createRoleSchema=new mongoose.Schema({
    name:{type:String},
    status:{type:Boolean, default:false}

})

const Role=mongoose.model("Role",createRoleSchema);

module.exports=Role;