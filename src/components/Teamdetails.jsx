import React, { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Teamdetails() {
  const [inputData, setInputData] = useState({
    player: "",
    teamName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTeamDetails = async () => {
    try {
      const response = await axios.post("http://localhost:5000/add-team", {
        player: inputData.player,
        teamName: inputData.teamName,
      });

      if (response.status === 201) {
        console.log("Team details added successfully");
        // Reset the input fields after adding the team details
        setInputData({
          player: "",
          teamName: "",
        });
        // Show a success message (you can replace this with a popup)
        alert("Player Details added successfully");
      } else {
        console.error("Failed to add team details");
      }
    } catch (error) {
      console.error("Error occurred during API call:", error);
      // Show an error message (you can replace this with a popup)
      alert("Error occurred during API call");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="h-[85vh] bg-black w-[100%] font-poppins flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-lime-400 text-3xl uppercase font-bold font-poppins mb-6">Add Team Details</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="text-white">Player:</label>
              <input
                type="text"
                name="player"
                value={inputData.player}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mb-2 bg-gray-800 border border-gray-600 rounded-md text-white"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="text-white">Team Name:</label>
              <input
                type="text"
                name="teamName"
                value={inputData.teamName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mb-2 bg-gray-800 border border-gray-600 rounded-md text-white"
              />
            </div>
          </div>
          <button
            onClick={handleAddTeamDetails}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Add Team Details
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Teamdetails;
