import React, { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Fantasyadmin() {
  const [inputData, setInputData] = useState({
    player: "",
    teamName: "",
    points: 0,
    date: new Date().toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
  });

  const [fantasyPlayers, setFantasyPlayers] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: name === 'date' ? new Date(value) : value,
    }));
  };

  const handleAddFantasyPlayer = async () => {
    try {
      const response = await axios.post("http://localhost:5000/add-fantasyplayer", inputData);
  
      if (response.status === 200) {
        console.log("Fantasy player added successfully");
        // Reset the input fields after adding the player
        setInputData({
          player: "",
          teamName: "",
          points: 0,
          date: new Date().toISOString().split('T')[0],
        });
  
        // Show success message in a pop-up window
        window.alert("Fantasy player added successfully");
      } else {
        console.error("Failed to add fantasy player");
      }
    } catch (error) {
      console.error("Error occurred during API call:", error);
    }
  };
  


  return (
    <div>
      <Navbar />
      <div className="h-[85vh] bg-black w-[100%] font-poppins flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-lime-400 text-3xl uppercase font-bold font-poppins mb-6">Add Fantasy Player</h1>
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
            <div className="col-span-2 md:col-span-1">
              <label className="text-white">Points:</label>
              <input
                type="number"
                name="points"
                value={inputData.points}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mb-2 bg-gray-800 border border-gray-600 rounded-md text-white"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="text-white">Date:</label>
              <input
                type="date"
                name="date"
                value={inputData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mb-2 bg-gray-800 border border-gray-600 rounded-md text-white"
              />
            </div>
          </div>
          <button
            onClick={handleAddFantasyPlayer}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Add Fantasy Player
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Fantasyadmin;
