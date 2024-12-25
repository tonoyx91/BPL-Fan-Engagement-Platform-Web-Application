import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add the code to handle the new password submission here.
    console.log('New Password submitted:', newPassword);
  };

  return (
    <div className="bg-[#0E3600]">
      <Navbar />
      <div className="h-[65vh] bg-black w-[100%] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-extrabold mb-4 bg-green-800 text-yellow-500 align-center pt-5 py-5 w-[350px]" align="Center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
          <div>
            <label htmlFor="new-password" className="sr-only">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="New Password"
              className="w-[300px] px-3 py-2 border rounded-md shadow-sm text-gray-900 focus:ring focus:ring-indigo-500"
            />
          </div>
          <div>
            <Link to="/" className="w-[300px]">
              <button
                type="submit"
                className="w-full py-2 px-4 text-sm font-medium text-white rounded-md bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset Password
              </button>
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;