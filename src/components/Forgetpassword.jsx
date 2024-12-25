import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; // Import your Navbar component
import Footer from './Footer'; // Import your Footer component

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  // Define formData state
  const [formData, setFormData] = useState({
    email: "",
  });

const handleSubmit = () => {

  navigate("/");
};




  const submit = async () =>  {
    
    try {
      await axios.post("http://localhost:5000/auth", formData);
      navigate("/Otp");

      // Redirect to Desktop3 after a short delay (e.g., 2 seconds)
      setTimeout(() => {
        navigate("/Otp");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

 
  // Define handleChange function to update formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-[#0E3600]">
      <Navbar /> {/* Include the Navbar at the top of the page */}
      <div className="h-[65vh] bg-black w-[100%] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-extrabold mb-4 bg-green-800 text-yellow-500 align-center pt-5 py-5 w-[350px]" align="Center">Recover Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4 relative flex items-center justify-center flex-col">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-[350px] px-3 py-2 border rounded-md shadow-sm text-gray-900 focus:ring focus:ring-indigo-500"
            />
          </div>
          <div>
          <button 
            >
              <Link 
              className="w-[300px] py-2 px-4 text-sm font-medium text-white rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={submit}
              >
              
                Submit
              
              </Link>
            </button>
          </div>
        </form>
      </div>
      <Footer /> {/* Include the Footer at the bottom of the page */}
    </div>
  );
};

export default ForgetPassword;