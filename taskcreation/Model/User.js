const mongoose= require("mongoose");

// UserSchema Created
const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
    },
    PhoneNumber:{
        type:String,
        unique:true,
    },
    Address:{
        type:String
    },
    password:{
        type:String,
    },
    isLoggedIn:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


module.exports=mongoose.model("Users",userSchema)