const Task = require("../Model/Task");


exports.Createtask= async(req,res)=>{
    try {
        const reqjson=({title,duedate,description,Status}=req.body);
          // if reqJson not exist then show error
          if (!reqjson || Object.keys(reqjson).length === 0) {
            return res.status(200).json({
                status: "Failed",
                code: 400,
                message: "No data received in the request body"
            });
        }
        const newtask=new Task(reqjson);
        const savedtask= await newtask.save();
        res.status(200).json({
            status: "Success",
            code: 200,
            message: " Task Created Succesfully",
            data: savedtask,
          });
    } catch (error) {
        // Show Error
        res.status(200).json({
            status:"Failed",
            Code:500,
            message:error.message
          }) 
    }
}



exports.Deletetask= async(req,res)=>{
    try {
        const { taskId } = req.body;
        // if not have event id then show error
        if (!taskId) {
            return res.status(200).json({
                status: "Failed",
                code: 400,
                message: 'Task ID is required'
            });
        }
        // Delete event by Schema
        const task = await Task.findOneAndDelete({ _id: taskId });
        // if not having event then error
        if (!task) {
            return res.status(200).json({
                status: "Failed",
                code: 404,
                message: 'task not found'
            });
        }
        // Show Data Sussfully
        res.status(200).json({
            status: "Success",
            code: 200,
            message: "task Deleted Successfully"
        });
    } catch (error) {
        // Show Error
        res.status(200).json({
            status: "Failed",
            code: 500,
            message: error.message
        });
    }
}

exports.Updatetask = async (req, res) => {
    try {
        const reqJson= ({ taskId,Status } = req.body);
        // Event id not exist then
        if (!taskId) {
            return res.status(200).json({
                status: "Failed",
                code: 400,
                message: "task ID is required for update"
            });
        }
        // updating Data 
        const updatedData = {
            Status:reqJson.Status
          };
          
        //   update Data in eventSchema
          const updatedtask = await Task.findOneAndUpdate(
              { _id: reqJson.taskId },
              { $set: updatedData }, // Update the event data
              { new: true } // Return the updated document
            )
            .exec();
          
            // not having Event then Show Error
        if(!updatedtask){
            return res.status(200).json({
                Status:"Failed",
                code:400,
                message:"Please Give a valid task Id"
            })
        }  
        // Send response after updating the event
        res.status(200).json({
            status: "Success",
            code: 200,
            message: "Event Updated Successfully",
            data: updatedtask
        });
    } catch (error) {
        // Return error response if any error occurs
        res.status(200).json({
            status: "Failed",
            code: 500,
            message: error.message
        });
    }
}

exports.Alltask=async(req,res)=>{
    try {
        // finding all event
        const task=await Task.find();
        res.status(200).json({
            status:"Success",
            code:200,
            message:"All task retrieved successfully",
            data:task
        })
    } catch (error) {
        // Return error response if any error occurs
        res.status(200).json({
            status: "Failed",
            code: 500,
            message: error.message
        });
    }
}


exports.specifictask=async(req,res)=>{
    try {
        const { taskId } = req.body;
        // if not have event id then show error
        if (!taskId) {
            return res.status(200).json({
                status: "Failed",
                code: 400,
                message: 'Task ID is required'
            });
        }
        // Delete event by Schema
        const task = await Task.findOne({ _id: taskId });
        // if not having event then error
        if (!task) {
            return res.status(200).json({
                status: "Failed",
                code: 404,
                message: 'task not found'
            });
        }
        // Show Data Sussfully
        res.status(200).json({
            status: "Success",
            code: 200,
            message: "task show Successfully",
            data:task
        });
    } catch (error) {
        // Return error response if any error occurs
        res.status(200).json({
            status: "Failed",
            code: 500,
            message: error.message
        });
    }
}