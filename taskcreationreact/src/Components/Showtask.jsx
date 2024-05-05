import React, { useEffect, useState } from 'react'
import { Updatetaskapi, deletetaskapi, getalltask } from '../Api/apiinterface';
import { useNavigate } from 'react-router-dom';

const Showtask = () => {
    const navigate = useNavigate();
    const [alltaks, setAlltask] = useState([]);
    const [selectedtask, setSelectedtask] = useState(null);
    const [selectedtasIdk, setSelectedtaskId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogUpdateOpen, setIsDialogUpdateOpen] = useState(false);
    const [formData,setformData]=useState(
        {
            taskId:'',
            Status:"",
        }
    )

  
    useEffect(() => {
      const fetchAlltask = async () => {
        const getAllLeadsResponse = await getalltask();
        
        setAlltask(getAllLeadsResponse.data)
  
      };
      fetchAlltask()
    }, []);
    
    const handleViewUser = (task) => {
        console.log(task);
        setSelectedtask(task);
        setIsDialogOpen(true);
      };
const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setIsDialogUpdateOpen(false)
};


    const handleDeletetask= async (taskId)=>{
        setformData({...formData,taskId:taskId})
        try {
            await deletetaskapi(formData)
            const getAllLeadsResponse= await getalltask();
            setAlltask(getAllLeadsResponse.data)
        } catch (error) {
            throw error;
        }
    }

    const handleupdatetask=(taskId)=>{
       
        setSelectedtaskId(taskId)
        setformData({...formData,taskId:taskId})
        setIsDialogUpdateOpen(true)
    }

    const updatetasknow=async (taskId)=>{
        // console.log(formData);
        try {
            const getAllresponse= await Updatetaskapi(formData);
            // console.log(getAllresponse);
            handleCloseDialog()
        } catch (error) {
            console.error('Tak error:', error);
            // Handle error appropriately, such as displaying an error message to the user
        }
    }
    


  return (
    <div className=" p-5 h-full overflow-scroll overflow-x-hidden">
        <div className='flex justify-between mb-4 overflow-x-hidden'>
        <h1 className=' mb-5 text-3xl font-bold'>All task</h1>
        <div className="Input element flex gap-10 mb-4 overflow-x-hidden">
          <input
            className="outline-none px-2 py-1 text-xl rounded-xl"
            type="text"
            placeholder="Filter by CategoryID"
           
          />
          <input
            className="outline-none px-2 py-1 text-xl rounded-xl"
            type="text"
            placeholder="Filter by Category_name"
           
          />
        </div>
        </div>
        <table className="w-full  rounded-3xl border-black">
          <thead className="border h-14">
            <tr>
              <th className="border">S.No.</th>
              <th className="border">Title</th>
              <th className="border">Due Date</th>
              <th className="border">CreatedAt</th>
              <th className="border">Status</th>
              <th className="border">Action</th>
            </tr>
          </thead>
          <tbody>
            {alltaks.map((task,index) => (
              <tr key={task._id} className="border h-10">
                <td className="border text-center">{index+1}</td>
                <td className="border text-center">{task.title}</td>
                <td className="border text-center">{task.duedate}</td>
                <td className="border text-center">{task.createdAt}</td>
                <td className="border text-center">{task.Status}</td>
                <td className="border flex justify-center items-center gap-5">
                  <button
                    className="w-32 px-3 py-2 bg-[#1976D2] text-white rounded-lg flex items-center justify-center"
                    onClick={(()=>handleViewUser(task))}
                  >
                    View User
                  </button>
                </td>
                <td className="border flex justify-center items-center gap-5">
                  <button
                    className="w-32 px-3 py-2 bg-[#DE300B] text-white rounded-lg flex items-center justify-center"
                    onClick={() => handleDeletetask(task._id)}
                  >
                    Delete User
                  </button>
                  
                </td>
                <td className="border flex justify-center items-center gap-5">
                <button
                    className="w-32 px-3 py-2 bg-[#4de655] text-white rounded-lg flex items-center justify-center"
                    onClick={()=>handleupdatetask(task._id)}
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isDialogOpen && selectedtask && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
        <div className={` p-8 rounded-lg flex flex-col items-left gap-3 text-[20px]`}>
          <h2 className="text-lg font-bold mb-4 text-center">User Details</h2>
          <p>Title : {selectedtask.title}</p>
          <p>Duedate : {selectedtask.duedate}</p>
          <p>Description : {selectedtask.description}</p>
          <p>CreatedAt : {selectedtask.createdAt}</p>
          <p>updatedAt : {selectedtask.updatedAt}</p>
          <p>Status : {selectedtask.Statu}</p>
          <button onClick={handleCloseDialog} className="mt-4 px-4 py-2 bg-gradient-to-br from-pink-600 via-pink-500 to-yellow-500 text-white rounded-lg">
            Close
          </button>
        </div>
      </div>
      
      )}
      {isDialogUpdateOpen && setSelectedtaskId && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
        <div className={` p-8 rounded-lg flex flex-col items-left gap-3 text-[20px]`}>
          <h2 className="text-lg font-bold mb-4 text-center">Update Your Task</h2>
          <form action="">
          <span className=' text-2xl'>Status:</span>
          <select
  className="text-xl ml-3 mr-28 text-black px-5 py-2 mb-3"
  name="Status"
  id="Status"
  value={formData.Status} // Set the value of the select element to formData.Status
  onChange={(e) => setformData({ ...formData, Status: e.target.value })} // Update formData.Status on change
>
  <option  value="pending">Pending</option>
  <option value="completed">Completed</option>
</select>
          </form>
          <button onClick={(selectedtasIdk)=>updatetasknow(selectedtasIdk)}  className="mt-4 px-4 py-2 bg-gradient-to-br from-green-600 via-green-500 to-yellow-500 text-black rounded-lg"> Update task </button>
          <button onClick={handleCloseDialog} className="mt-4 px-4 py-2 bg-gradient-to-br from-pink-600 via-pink-500 to-yellow-500 text-white rounded-lg">
            Close
          </button>
        </div>
      </div>
      
      )}
      </div>
  )
}

export default Showtask