import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import FileInput from "./FileInput";
import axios from "axios";

function Profile() {
  const [userProfile, setUserProfile] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    favoriteTeam: "",
    fantasyTeam: "",
    gender: "",
    dateOfBirth: "",
    profileImage: null,
  });

  const [userExists, setUserExists] = useState(false);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    axios
      .post("http://localhost:5000/user-profile-check", { email: userEmail })
      .then((response) => {
        const userData = response.data;
        if (userData) {
          setUserProfile((prevProfile) => ({ ...prevProfile, ...userData }));
          setUserExists(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setUserExists(false);
      });
  }, [userEmail]);

  const handleProfileSubmission = async () => {
    try {
      const updatedProfile = {
        email: userEmail,
        ...userProfile,
      };

      if (userExists) {
        await axios.put("http://localhost:5000/update-user-profile", updatedProfile);
        alert("Profile data updated successfully.");
      } else {
        await axios.post("http://localhost:5000/user-profile", updatedProfile);
        alert("Profile data saved successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Error while saving/updating profile data!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          profileImage: reader.result,
        }));
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl text-lime-500 font-extrabold text-center py-2">
        PROFILE
      </h1>
      <div className="font-poppins py-8 px-4 sm:px-8 container mx-auto flex justify-center items-center">
        <div className="max-w-md w-full">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="relative w-40 h-40 mx-auto mb-4">
              {userProfile.profileImage ? (
                <img
                  src={userProfile.profileImage}
                  alt="Profile"
                  className="w-40 h-40 object-cover rounded-full"
                />
              ) : (
                <div className="w-40 h-40 bg-green-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-s">Upload Photo</span>
                </div>
              )}
              <FileInput onChange={convertToBase64} accept="image/*" />
            </div>
            <form>
              {/* User input fields */}
              {/* Full Name */}
              <div className="py-2 mb-4 ">
                <label htmlFor="fullName" className="text-green-400 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={userProfile.fullName}
                  onChange={handleInputChange}
                  className="bg-indigo-950 text-white w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-500"
                />
              </div>

              {/* Gender */}
              <div className="mb-4">
                <label htmlFor="gender" className="text-green-400 font-medium">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={userProfile.gender}
                  onChange={handleInputChange}
                  className="bg-indigo-950 text-white w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div className="mb-4">
                <label
                  htmlFor="dateOfBirth"
                  className="text-green-400 font-medium"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={userProfile.dateOfBirth}
                  onChange={handleInputChange}
                  className="bg-indigo-950 text-white w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-500"
                />
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="text-green-400 font-medium"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={userProfile.phoneNumber}
                  onChange={handleInputChange}
                  className="bg-indigo-950 text-white w-full px-3 py-2 border border-blue- rounded-md focus:ring focus:ring-indigo-500"
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label htmlFor="address" className="text-green-400 font-medium">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userProfile.address}
                  onChange={handleInputChange}
                  className="bg-indigo-950 text-white w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-500"
                />
              </div>

              {/* Favorite Team */}
              <div className="mb-4">
                <label
                  htmlFor="favoriteTeam"
                  className="text-green-400 font-medium"
                >
                  Favorite Team
                </label>
                <select
                  id="favoriteTeam"
                  name="favoriteTeam"
                  value={userProfile.favoriteTeam}
                  onChange={handleInputChange}
                  className="bg-indigo-950 text-white w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-500"
                >
                  <option value="">Select Team</option>
                  <option value="Chittagong Challengers">Chittagong Challengers</option>
                  <option value="Comilla Victorians">Comilla Victorians</option>
                  <option value="Dhaka Dominators">Dhaka Dominators</option>
                  <option value="Fortune Barishal">Fortune Barishal</option>
                  <option value="Khulna Tigers">Khulna Tigers</option>
                  <option value="Sylhet Strikers">Sylhet Strikers</option>
                </select>
              </div>

              {/* Fantasy Team */}
              <div className="mb-6">
                <label
                  htmlFor="fantasyTeam"
                  className="text-green-400 font-medium"
                >
                  Fantasy Team
                </label>
                <input
                  type="text"
                  id="fantasyTeam"
                  name="fantasyTeam"
                  value={userProfile.fantasyTeam}
                  onChange={handleInputChange}
                  className="bg-indigo-950 text-white w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-500"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleProfileSubmission}
                  className="bg-blue-500 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
