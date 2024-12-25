/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";

function PointsTable() {
  const [tableData, setTableData] = useState([]);
  const isAdmin = localStorage.getItem("email") === "admin.bpl.23@gmail.com";

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-points-table");
        console.log("API Response:", response.data);
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchTableData();
  }, []);

  const handleEdit = async (teamName) => {
    // Check if user is admin before showing the prompt
    if (isAdmin) {
      const editedMatches = prompt(`Enter new matches for ${teamName}:`);
      const editedWins = prompt(`Enter new wins for ${teamName}:`);
      const editedLosses = prompt(`Enter new losses for ${teamName}:`);
      const editedDraws = prompt(`Enter new draws for ${teamName}:`);
      const editedPoints = prompt(`Enter new points for ${teamName}:`);
      const editedNetRunRate = prompt(`Enter new net run rate for ${teamName}:`);
  
      const requestBody = {
        teamName,
        totalMatches: parseInt(editedMatches),
        win: parseInt(editedWins),
        losses: parseInt(editedLosses),
        draw: parseInt(editedDraws),
        points: parseInt(editedPoints),
        netRunRate: parseInt(editedNetRunRate),
      };
  
      try {
        console.log("Request body:", requestBody);
        const response = await axios.put("http://localhost:5000/update-team", requestBody);
  
        if (response.status === 200) {
          const updatedTableData = tableData.map((team) => {
            if (team.teamName === teamName) {
              return { ...team, ...requestBody };
            }
            return team;
          });
  
          setTableData(updatedTableData);
          window.location.reload();
          // Show success alert
          alert("Data updated successfully");
        } else {
          console.error('Failed to update team data');
          // Show error alert
          alert("Failed to update team data");
        }
      } catch (error) {
        console.error('Error occurred during API call:', error);
        // Show error alert
        alert("Error occurred during API call");
      }
    } else {
      // Show a message or perform some other action for non-admin users
      alert("You do not have permission to edit data.");
    }
  };
  

  

  return (
    <div>
      <Navbar />
      <div className="h-[85vh] bg-black w-[100%] font-poppins">
        <div className="m-10">
          <h1 className="text-lime-400 text-3xl uppercase font-bold font-poppins mb-2 text-center ">Points Table</h1>
          <table className="min-w-full divide-y divide-gray-200 text-white">
            <thead className="bg-gray-900 font-bold text-white">
              <tr>
                <th className="px-3 py-3 text-center uppercase tracking-wider">Team</th>
                <th className="px-3 py-3 text-center uppercase tracking-wider">Matches</th>
                <th className="px-3 py-3 text-center uppercase tracking-wider">Wins</th>
                <th className="px-3 py-3 text-center uppercase tracking-wider">Losses</th>
                <th className="px-3 py-3 text-center uppercase tracking-wider">Draws</th>
                <th className="px-3 py-3 text-center uppercase tracking-wider">Points</th>
                <th className="px-3 py-3 text-center uppercase tracking-wider">Net Run Rate</th>
                {isAdmin && <th className="px-3 py-3 text-center uppercase tracking-wider">Edit</th>}
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-600 text-center">
              {tableData.map((team) => (
                <tr key={team._id}>
                  <td className="px-4 py-4 whitespace-nowrap text-left font-bold">{team.teamName}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{team.totalMatches}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{team.win}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{team.losses}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{team.draw}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{team.points}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{team.netRunRate}</td>
                  {isAdmin && (
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        className="bg-blue-500 text-black py-2 px-4 rounded-md"
                        onClick={() => handleEdit(team.teamName)}
                      >
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br /><br />
      <Footer />
    </div>
  );
}

export default PointsTable;
