import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";

const Fantasy = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [fantasyTeamName, setFantasyTeamName] = useState("");
  const [teamPlayers, setTeamPlayers] = useState({ Dhaka: [], Cumilla: [] });
  const [currentDate, setCurrentDate] = useState("");

  const fetchPlayersByTeam = async (teamName) => {
    try {
      const response = await axios.post("http://localhost:5000/get-players-by-team", {
        teamName: teamName === "Dhaka" ? "Dhaka Dominators" : "Cumilla Victorians",
      });

      return response.data.players;
    } catch (error) {
      console.error("Error fetching players:", error);
      alert("Error fetching players. Please try again.");
      return [];
    }
  };

  const handlePlayerSelect = (team, player) => {
    if (selectedPlayers.length < 11) {
      setSelectedPlayers([...selectedPlayers, { team, player }]);
    } else {
      alert("Maximum players selected already!");
    }
  };

  const handleSubmit = async () => {
    const userEmail = localStorage.getItem("email");

    try {
      const response = await axios.post("http://localhost:5000/fantasyteam/insert", {
        email: userEmail,
        teamname: fantasyTeamName,
        players: selectedPlayers.map((player) => player.player),
        date: currentDate,
      });

      console.log("Fantasy team data inserted:", response.data);
    } catch (error) {
      console.error("Error inserting data into FantasyTeam table:", error);
    }
  };

  const updateCurrentDate = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    setCurrentDate(formattedDate);
  };
  

  const fetchUserData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/user-profile-check", {
        email: localStorage.getItem("email"),
      });
      const userData = response.data;

      setFantasyTeamName(userData.fantasyTeam || "Add your team name from the profile page");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchAllPlayers = async () => {
    const dhakaPlayers = await fetchPlayersByTeam("Dhaka");
    const cumillaPlayers = await fetchPlayersByTeam("Cumilla");
    setTeamPlayers({ Dhaka: dhakaPlayers, Cumilla: cumillaPlayers });
  };

  useEffect(() => {
    fetchUserData();
    fetchAllPlayers();
    updateCurrentDate();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-[100%] bg-black">
        <div className="font-poppins text-xl font-bold items-center justify-center pt-8 relative bg- text-white">
          <div className="text-5xl text-lime-400 mb-4 text-center">Edit Your Team</div>
          <div className="text-3xl text-lime-400 mb-10 text-center">For {currentDate}</div>
          <div className="flex justify-center gap-44 mb-10 py-5">
            <div className="justify-center">
              <p className="text-4xl text-red-600 text-center">{fantasyTeamName}</p>
            </div>
          </div>
          <div className="flex gap-20 justify-center items-center pb-10">
            <div>
              <div className="flex gap-20 justify-around w-full">
                <div>
                  <h2 className="text-xl text-blue-400 mb-2">Dhaka</h2>
                  {teamPlayers.Dhaka.map((player, index) => (
                    <div
                      key={index}
                      className="cursor-pointer hover:text-blue-300 mb-2"
                      onClick={() => handlePlayerSelect("Dhaka", player)}
                    >
                      {player}
                    </div>
                  ))}
                </div>
                <div>
                  <h2 className="text-xl text-red-400 mb-2">Cumilla</h2>
                  {teamPlayers.Cumilla.map((player, index) => (
                    <div
                      key={index}
                      className="cursor-pointer hover:text-red-300 mb-2"
                      onClick={() => handlePlayerSelect("Cumilla", player)}
                    >
                      {player}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-1 h-64 rounded-3xl bg-green-500"></div>
            <div className="mt-5">
              <h2 className="text-xl text-yellow-400 mb-2">Selected Players</h2>
              {selectedPlayers.map((player, index) => (
                <div key={index} className="text-white">
                  {`${player.team} - ${player.player}`}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              className="bg-green-500 text-white font-poppins font-bold rounded p-4 cursor-pointer transition duration-300"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Fantasy;
