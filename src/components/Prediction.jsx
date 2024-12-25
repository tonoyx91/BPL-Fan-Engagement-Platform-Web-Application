/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Modal from "react-modal";

function Prediction() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [team1Name, setTeam1Name] = useState("Dhaka Dominators");
  const [team2Name, setTeam2Name] = useState("Cumilla Victorians");
  const [lastDaysWinner, setLastDaysWinner] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [newMatchResult, setNewMatchResult] = useState("");

  const deadline = new Date();
  deadline.setHours(23, 0, 0, 0);
  const currentTime = new Date();

  const handleTeamSelect = (team) => {
    if (!selectedTeam && currentTime < deadline) {
      setSelectedTeam(team);
    }
  };

  const calculateTimeLeft = () => {
    let difference = +deadline - +currentTime;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const options = { year: "numeric", month: "long", day: "2-digit" };
  const formattedDate = new Date().toLocaleDateString("en-US", options);

  // Modal state
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  // Separate state variables for team selection in modals
  const [selectedTeamModal1, setSelectedTeamModal1] = useState(team1Name);
  const [selectedTeamModal2, setSelectedTeamModal2] = useState(team2Name);

  // Open and close modal functions
  const openTeamModal = () => {
    setShowTeamModal(true);
  };

  const closeTeamModal = () => {
    setShowTeamModal(false);
  };

  const openResultModal = () => {
    setShowResultModal(true);
  };

  const closeResultModal = () => {
    setShowResultModal(false);
  };

  const teamOptions = [
    "Cumilla Victorians",
    "Chattogram Challengers",
    "Dhaka Dominators",
    "Fortune Barishal",
    "Rangpur Riders",
    "Sylhet Strikers",
  ];

  const teamDropdown1 = (
    <select
      value={selectedTeamModal1}
      onChange={(e) => setSelectedTeamModal1(e.target.value)}
      className="bg-gray-800 border border-gray-300 rounded-md w-full px-3 py-2 mb-4 text-white"
    >
      <option value="">Select Team</option>
      {teamOptions.map((team) => (
        <option key={team} value={team}>
          {team}
        </option>
      ))}
    </select>
  );

  const teamDropdown2 = (
    <select
      value={selectedTeamModal2}
      onChange={(e) => setSelectedTeamModal2(e.target.value)}
      className="bg-gray-800 border border-gray-300 rounded-md w-full px-3 py-2 mb-4 text-white"
    >
      <option value="">Select Team</option>
      {teamOptions.map((team) => (
        <option key={team} value={team}>
          {team}
        </option>
      ))}
    </select>
  );

  const updateTeamNames = () => {
    setTeam1Name(selectedTeamModal1);
    setTeam2Name(selectedTeamModal2);
    closeTeamModal();
  };

  const resultDropdown = (
    <select
      value={newMatchResult}
      onChange={(e) => setNewMatchResult(e.target.value)}
      className="bg-gray-800 border border-gray-300 rounded-md w-full px-3 py-2 mb-4 text-white"
    >
      <option value="">Select Result</option>
      <option value={team1Name}>{team1Name} Wins</option>
      <option value={team2Name}>{team2Name} Wins</option>
      <option value="Draw">Match Draw</option>
    </select>
  );

  const updateResult = () => {
    setMatchResult(newMatchResult);
    setLastDaysWinner(
      newMatchResult === team1Name
        ? team1Name
        : newMatchResult === team2Name
        ? team2Name
        : ""
    );
    closeResultModal();
  };

  return (
    <div>
      <Navbar />
      <div className="h-[85vh] bg-black w-[100%]">
        <div className="font-poppins text-xl font-bold flex flex-col items-center justify-center pt-8 relative bg-black text-orange-300">
          <h1 className="text-3xl text-lime-400 mb-4">PREDICT THE WINNER OF TODAY'S MATCH</h1>
          <h2>{`Date: ${formattedDate}`}</h2>
          {currentTime < deadline ? (
            <h2>
              {`Deadline: ${deadline.toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}`}
            </h2>
          ) : (
            <p>Prediction Deadline is over</p>
          )}
          <div className="py-5 flex flex-col justify-center items-center mb-10">
            <div>
              <button
                onClick={() => handleTeamSelect(team1Name)}
                disabled={matchResult || currentTime > deadline}
                className={`inline-block px-8 py-4 mr-3 font-bold text-center text-white uppercase align-middle transition-transform rounded-lg cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 leading-pro text-md ease-in-out tracking-tight-soft shadow-md hover:scale-105 hover:rotate-2 hover:from-blue-600 hover:to-blue-400 hover:text-white active:opacity-85 ${
                  selectedTeam === team1Name &&
                  "bg-gradient-to-r from-green-400 to-green-600"
                }`}
              >
                {team1Name}
              </button>
            </div>
            <p className="text-white font-bold text-xl py-2">vs</p>
            <div>
              <button
                onClick={() => handleTeamSelect(team2Name)}
                disabled={matchResult || currentTime > deadline}
                className={`inline-block px-8 py-4 mr-3 font-bold text-center text-white uppercase align-middle transition-transform rounded-lg cursor-pointer bg-gradient-to-r from-red-400 to-red-600 leading-pro text-md ease-in-out tracking-tight-soft shadow-md hover:scale-105 hover:rotate-2 hover:from-red-600 hover:to-red-400 hover:text-white active:opacity-85 ${
                  selectedTeam === team2Name &&
                  "bg-gradient-to-r from-green-400 to-green-600"
                }`}
              >
                {team2Name}
              </button>
            </div>
            {localStorage.getItem("email") === "admin.bpl.23@gmail.com" && (
              <button
                onClick={() => setEditMode(!editMode)}
                className="bg-green-500 hover:bg-green-700 text-white text-sm mt-1 mb-4 font-bold py-1 px-2 rounded ml-2"
              >
                {editMode ? "Save Changes" : "Edit Teams and Result"}
              </button>
            )}
            {editMode && (
              <>
                <button onClick={openTeamModal}
                  className="bg-blue-500 hover:bg-blue-700 text-white text-lg mt-8 mb-4 font-bold py-1 px-2 rounded ml-2"
                >
                  Edit Teams
                </button>
                <button onClick={openResultModal}
                  className="bg-purple-500 hover:bg-purple-700 text-white text-lg mt-1 mb-4 font-bold py-1 px-2 rounded ml-2"
                >
                  Edit Result
                </button>
              </>
            )}
            {selectedTeam && (
              <div className="text-center">
                <p className="text-3xl font-bold py-5" style={{ color: "yellow" }}>
                  Prediction is locked!
                </p>
                <p className="text-xl font-extrabold mb-10 " style={{ color: "white" }}>
                  Your Prediction is {selectedTeam}.<br />
                  <br></br>
                  Wait until the end of the match to see the result.<br />
                  Best of Luck!
                </p>
              </div>
            )}
            {currentTime < deadline ? (
              <div>
                <div className="mt-10 text-cyan-400 bg-gray-900 rounded-xl grid grid-flow-col gap-5 text-center auto-cols-max mb-5">
                  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                      <span style={{ "--value": timeLeft.days }}>{timeLeft.days}</span>
                    </span>
                    days
                  </div>
                  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                      <span style={{ "--value": timeLeft.hours }}>{timeLeft.hours}</span>
                    </span>
                    hours
                  </div>
                  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                      <span style={{ "--value": timeLeft.minutes }}>{timeLeft.minutes}</span>
                    </span>
                    min
                  </div>
                  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                      <span style={{ "--value": timeLeft.seconds }}>{timeLeft.seconds}</span>
                    </span>
                    sec
                  </div>
                </div>
              </div>
            ) : matchResult ? (
              <p className="text-lg font-bold" style={{ color: "white" }}>{`Match Result: ${matchResult}`}</p>
            ) : null}
            {lastDaysWinner && <p>Last Match Winner: {lastDaysWinner}</p>}
          </div>
        </div>
        <Footer />
      </div>

      {/* Team Name Modal */}
      <Modal
        isOpen={showTeamModal}
        onRequestClose={closeTeamModal}
        contentLabel="Edit Team Names"
        style={{
          content: {
            width: "350px",
            height: "650px",
            margin: "auto",
            background: "#333",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            color: "#fff",
          },
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-9">Edit Teams</h2>
        <div className="mb-4">
          <label className="block py-5">
            Edit Team 1: {teamDropdown1}
          </label>
          <label className="block">
            Edit Team 2: {teamDropdown2}
          </label>
        </div>
        <button
          onClick={updateTeamNames}
          className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Teams
        </button>
        <button
          onClick={closeTeamModal}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Close
        </button>
      </Modal>

      {/* Result Modal */}
      <Modal
        isOpen={showResultModal}
        onRequestClose={closeResultModal}
        contentLabel="Edit Result"
        style={{
          content: {
            width: "350px",
            height: "500px",
            margin: "auto",
            background: "#333",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            color: "#fff",
          },
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Edit Result</h2>
        <div className="mb-4 mt-12">{resultDropdown}</div>
        <button
          onClick={updateResult}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Result
        </button>
        <button
          onClick={closeResultModal}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

export default Prediction;
