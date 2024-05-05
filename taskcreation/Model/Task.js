const mongoose= require("mongoose");

// UserSchema Created
const taskSchema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String,
    },
    duedate:{
        type:Date
    },
    Status:{
        type:String,
        default:"pending",
    }
},{timestamps:true})


module.exports=mongoose.model("task",taskSchema)