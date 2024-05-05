import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signup } from '../Api/apiinterface';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        PhoneNumber: '',
        Address: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = () => {
      navigate("/login");
    };
    const handleSignup = async () => {
        
        try {
            const getAllresponse= await signup(formData)
            if(getAllresponse.data){
                navigate("/login")
            }
        } catch (error) {
            console.error('Signup error:', error);
            // Handle error appropriately, such as displaying an error message to the user
        }
    };
  return (
    <div className="h-screen w-screen bg-zinc-800 flex items-center justify-center">
      <div className="h-[650px] w-[520px] bg-zinc-100 rounded-lg px-10 py-5 flex flex-col items-center">
        <h1 className="font-bold text-3xl">Magnet Brain Signup</h1>
        <form className="flex flex-col mt-5 mb-5 gap-1">
        <label className="font-semibold" htmlFor="name">
            Name :
          </label>
          <input
            className="outline-none px-5 py-2 mb-3"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
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
           <label className="font-semibold" htmlFor="name"> 
            Address :
          </label>
          <input
            className="outline-none px-5 py-2 mb-3"
            id="Address"
            type="text"
            name="Address"
            value={formData.Address}
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
          onClick={handleSignup}
        >
          Signup
        </button>
        
        <p className="px-7 py-2">If you aleredy registerd then Login</p>
        <button
          className="px-7 py-2 font-semibold bg-[#1976D2] text-white rounded-lg"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Signup