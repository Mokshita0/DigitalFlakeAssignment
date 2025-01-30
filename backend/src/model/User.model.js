const mongoose=require("mongoose");

const createUserSchema=new mongoose.Schema({
    name:{type:String},
    email:String,
    password:{type:String, default:"123456"},
    mobile:Number,
    role:{type:mongoose.Schema.Types.ObjectId, ref:"Role"},
    status:{type:Boolean, default:false}
})

const User=mongoose.model("User",createUserSchema);

module.exports=User;