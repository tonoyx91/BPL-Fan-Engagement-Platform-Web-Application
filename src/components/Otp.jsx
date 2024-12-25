import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from './Navbar'; // Import your Navbar component
import Footer from './Footer'; // Import your Footer component

const Otp = () => {
  const [otp, setotp] = useState('');

  const handleotpChange = (e) => {
    setotp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add the code to handle the otp submission here.
    console.log('otp submitted:', otp);
  };

  return (
    <div className="bg-[#0E3600]">
      <Navbar /> {/* Include the Navbar at the top of the page */}
      <div className="h-[65vh] bg-black w-[100%] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-extrabold mb-4 bg-green-800 text-yellow-500 align-center pt-5 py-5 w-[350px]" align="Center">Enter Your OTP Here:</h2>
        <form onSubmit={handleSubmit} className="space-y-4 relative flex items-center justify-center flex-col">
          <div>
            <label htmlFor="otp" className="sr-only">
              OTP
            </label>
            <input
              type="otp"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleotpChange}
              placeholder="OTP"
              className="w-[350px] px-3 py-2 border rounded-md shadow-sm text-gray-900 focus:ring focus:ring-indigo-500"
            />
          </div>
          <div>
          <Link to="/resetpassword" className="w-[300px]">
              <button
                type="submit"
                className="w-full py-2 px-4 text-sm font-medium text-white rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </Link>
          </div>
        </form>
      </div>
      <Footer /> {/* Include the Footer at the bottom of the page */}
    </div>
  );
};

export default Otp;
