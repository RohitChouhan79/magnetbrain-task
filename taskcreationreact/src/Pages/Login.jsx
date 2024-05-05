import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loginuser } from "../Api/apiinterface";
import Task from "./Task";
// import { getAllCategory } from "./api/apiInterface";



const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  const [formData, setFormData] = useState({
    email: '',
    PhoneNumber: '',
    password: ''
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};
  const handleLogin = async () => {
    
    try {
        const getAllresponse= await Loginuser(formData);
        if(getAllresponse.data){
            setIsLoggedIn(true)
            if(isLoggedIn===true){
                console.log("object");
                navigate("/task")
            }
            
        }
    } catch (error) {
        navigate("/")
    }
  };

  const handleSignup = () => {
    // Perform login logic here

    // After successful login, navigate to the dashboard
    navigate("/");
  };

 

  return (
    <div className="h-screen w-screen bg-zinc-800 flex items-center justify-center">
      <div className="h-[600px] w-[520px] bg-zinc-100 rounded-lg px-10 py-5 flex flex-col items-center">
        <h1 className="font-bold text-3xl">Magnet Brain Loginup</h1>
        <form className="flex flex-col mt-5 mb-5 gap-1">
          <label className="font-semibold" htmlFor="name">
            Email :
          </label>
          <input
            className="outline-none px-5 py-2 mb-3"
            id="email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <p className=" to-blue-600 text-center font-bold text-2xl">OR</p>
           <label className="font-semibold" htmlFor="name">
            Phone Number :
          </label>
          <input
            className="outline-none px-5 py-2 mb-3"
            id="PhoneNumber"
            type="text"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
          />
          <label className="font-semibold" htmlFor="password">
            PASSWORD :
          </label>
          <input
            className="outline-none px-5 py-2"
            id="password"
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </form>
        <button
          className="px-7 py-2 font-semibold bg-[#1976D2] text-white rounded-lg"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="px-7 py-2">If you not registerd then register Yourself</p>
        <button
          className="px-7 py-2 font-semibold bg-[#1976D2] text-white rounded-lg"
          onClick={handleSignup}
        >
          Signup
        </button>
      </div>
    </div>
  );
};


export default Login;
