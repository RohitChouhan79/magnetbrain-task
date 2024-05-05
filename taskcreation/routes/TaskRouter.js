const express=require("express");
const { Createtask, Deletetask, Updatetask, specifictask, Alltask } = require("../Controller/TaskController");

const router=express.Router();

//   Post /createtask
router.post("/createtask",Createtask);    

// POST /delete task
router.post("/deletetask",Deletetask);

// post update tassk
router.post("/updatetask",Updatetask);

router.get("/alltask",Alltask);

router.post("/specifictask",specifictask)

module.exports=router