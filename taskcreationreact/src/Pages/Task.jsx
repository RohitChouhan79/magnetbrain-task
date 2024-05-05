import React, { useState } from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { Createtaskapi } from '../Api/apiinterface';
import Showtask from '../Components/Showtask';

const Task = () => {
    const [formData, setFormData] = useState({
        title:" ",
        duedate:" ",
        Status:" ",
        description:""
    });
    const [message,setMessage]=useState(null)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlecreatetask = async () => {
        
        // console.log(formData);
        try {
            const getAllresponse= await Createtaskapi(formData);
            setMessage(getAllresponse.message)
        } catch (error) {
            console.error('Tak error:', error);
            // Handle error appropriately, such as displaying an error message to the user
        }
    };

    // Hide the message after 2 seconds
    setTimeout(() => {
        setMessage('');
      }, 2000);
  return (
    <div className="h-screen w-screen  bg-slate-100 flex">
      <nav className="h-[99.9%] w-[16%] bg-slate-400 flex flex-col items-center gap-4 pt-14">
        <h1 className=' text-4xl font-bold text-center mb-5'>Magnet Brains</h1>
        <button className="flex justify-center items-center hover:text-white hover:bg-slate-800 h-10 w-40 px-7 py-3 font-semibold rounded-lg bg-zinc-200 text-zinc-800">
          Logout
        </button>
      </nav>
      <div className=" py-2 h-full w-[80%] ">
        <div className="h-[40%] py-2 flex flex-col gap-4 items-center border-b border-collapse mb-5 px-2">
          <h1 className=' text-2xl font-bold text-center'>Create your Task</h1>
          <div>
          <form className=" ">
            <span className=' text-2xl'>Title:</span>
          <input
            className=" text-xl ml-3 mr-28 text-black px-5 py-2 mb-3"
            id="title"
            type="text"
            placeholder='Enter Title'
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          
          <span className=' text-2xl'>Duedate:</span>
          <input type="date" className=" text-xl ml-3 text-black px-5 py-2 mb-3" name="duedate" id="duedate" value={formData.duedate} onChange={handleChange} />

          <br />
          <br />
          <span className=' text-2xl'>Description:</span>
          <input
            className=" text-xl ml-3 mr-28 text-black px-5 py-2 mb-3"
            id="description"
            type="text"
            placeholder='Enter Description'
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <span className=' text-2xl'>Status:</span>
          <select
  className="text-xl ml-3 mr-28 text-black px-5 py-2 mb-3"
  name="Status"
  id="Status"
  value={formData.Status} // Set the value of the select element to formData.Status
  onChange={(e) => setFormData({ ...formData, Status: e.target.value })} // Update formData.Status on change
>
  <option  value="pending">Pending</option>
  <option value="completed">Completed</option>
</select>

        </form>
          </div>
          <button
          className="px-7 py-2 mt-5 font-semibold bg-[#1976D2] text-white items-center rounded-lg"
          onClick={handlecreatetask}
        >
          Create Task
        </button>
        <p className={message ? ' text-red-600 text-2xl' : ''}>{message}</p>
          {/*  */}
        </div>
        
        <div className="py-3 h-[475px] overflow-x-hidden ">
            <Showtask />
          
        </div>
      </div>
    </div> 
  )
}

export default Task