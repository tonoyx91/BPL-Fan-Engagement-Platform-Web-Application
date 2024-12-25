/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Stats() {
  const isAdmin = localStorage.getItem("email") === "admin.bpl.23@gmail.com";
  const initialWicketData = [
    { player: "Taskin Ahmed", wickets: 25 },
    { player: "Fazal Haq Farooqi", wickets: 22 },
    { player: "Haris Rauf", wickets: 20 },
    { player: "Tanzim Sakib", wickets: 18 },
    { player: "Mrittunjoy Chowdhury", wickets: 15 },
  ];

  const initialRunScorerData = [
    { player: "Tamim Iqbal", runs: 500 },
    { player: "Rahmanullah Gurbaaz", runs: 480 },
    { player: "Dawid Malan", runs: 450 },
    { player: "Bebshayi Shakip", runs: 420 },
    { player: "Mahmudullah Riyad", runs: 400 },
  ];

  const initialIndividualScoreData = [
    { player: "Tamim Iqbal", score: 125 },
    { player: "Mahmudullah Riyad", score: 112 },
    { player: "Towhid Hridoy", score: 89 },
    { player: "Mehidy Hasan Miraz", score: 75 },
    { player: "Nazmul Hossain Shanto", score: 72 },
  ];

  const initialBowlingFigureData = [
    { player: "Mashrafe Mortaza", figure: "5/20" },
    { player: "Taskin Ahmed", figure: "4/18" },
    { player: "Rashid Khan", figure: "4/22" },
    { player: "Hasan Mahmud", figure: "3/15" },
    { player: "Noor Ahmad", figure: "3/20" },
  ];

  const initialSixesData = [
    { player: "Tanzid Tamim", sixes: 21 },
    { player: "Rahmanullah Gurbaaz", sixes: 18 },
    { player: "Mahmudullah Riyad", sixes: 17 },
    { player: "Tamim Iqbal", sixes: 15 },
    { player: "Glen Maxwell", sixes: 13 },
  ];

  const initialFoursData = [
    { player: "Tamim Iqbal", fours: 48 },
    { player: "Rahmanullah Gurbaaz", fours: 42 },
    { player: "Towhid Hrido", fours: 38 },
    { player: "Nazmul Hossain Shanto", fours: 35 },
    { player: "Aiden Markram", fours: 31 },
  ];

  const [wicketData, setWicketData] = useState(initialWicketData);
  const [runScorerData, setRunScorerData] = useState(initialRunScorerData);
  const [individualScoreData, setIndividualScoreData] = useState(initialIndividualScoreData);
  const [bowlingFigureData, setBowlingFigureData] = useState(initialBowlingFigureData);
  const [sixesData, setSixesData] = useState(initialSixesData);
  const [foursData, setFoursData] = useState(initialFoursData);

  const [editingWicketIndex, setEditingWicketIndex] = useState(-1);
  const [editingRunScorerIndex, setEditingRunScorerIndex] = useState(-1);
  const [editingIndividualScoreIndex, setEditingIndividualScoreIndex] = useState(-1);
  const [editingBowlingFigureIndex, setEditingBowlingFigureIndex] = useState(-1);
  const [editingSixesIndex, setEditingSixesIndex] = useState(-1);
  const [editingFoursIndex, setEditingFoursIndex] = useState(-1);

  const [editedWicketPlayer, setEditedWicketPlayer] = useState("");
  const [editedWickets, setEditedWickets] = useState(0);

  const [editedRunScorerPlayer, setEditedRunScorerPlayer] = useState("");
  const [editedRuns, setEditedRuns] = useState(0);

  const [editedIndividualScorePlayer, setEditedIndividualScorePlayer] = useState("");
  const [editedScore, setEditedScore] = useState(0);

  const [editedBowlingFigurePlayer, setEditedBowlingFigurePlayer] = useState("");
  const [editedFigure, setEditedFigure] = useState("");

  const [editedSixesPlayer, setEditedSixesPlayer] = useState("");
  const [editedSixes, setEditedSixes] = useState(0);

  const [editedFoursPlayer, setEditedFoursPlayer] = useState("");
  const [editedFours, setEditedFours] = useState(0);

  const handleWicketEditClick = (index) => {
    setEditingWicketIndex(index);
    setEditedWicketPlayer(wicketData[index].player);
    setEditedWickets(wicketData[index].wickets);
  };

  const handleRunScorerEditClick = (index) => {
    setEditingRunScorerIndex(index);
    setEditedRunScorerPlayer(runScorerData[index].player);
    setEditedRuns(runScorerData[index].runs);
  };

  const handleIndividualScoreEditClick = (index) => {
    setEditingIndividualScoreIndex(index);
    setEditedIndividualScorePlayer(individualScoreData[index].player);
    setEditedScore(individualScoreData[index].score);
  };

  const handleBowlingFigureEditClick = (index) => {
    setEditingBowlingFigureIndex(index);
    setEditedBowlingFigurePlayer(bowlingFigureData[index].player);
    setEditedFigure(bowlingFigureData[index].figure);
  };

  // Part 1 ends here
  // Continue with Part 2 for the rest of the implementation

  // Part 1...

  // Part 2 continues here
  const handleSixesEditClick = (index) => {
    setEditingSixesIndex(index);
    setEditedSixesPlayer(sixesData[index].player);
    setEditedSixes(sixesData[index].sixes);
  };

  const handleFoursEditClick = (index) => {
    setEditingFoursIndex(index);
    setEditedFoursPlayer(foursData[index].player);
    setEditedFours(foursData[index].fours);
  };

  const handleSaveWicketEdit = () => {
    if (editingWicketIndex !== -1) {
      const updatedData = [...wicketData];
      updatedData[editingWicketIndex] = {
        player: editedWicketPlayer,
        wickets: editedWickets,
      };
      setWicketData(updatedData);
      setEditingWicketIndex(-1);
    }
  };

  const handleSaveRunScorerEdit = () => {
    if (editingRunScorerIndex !== -1) {
      const updatedData = [...runScorerData];
      updatedData[editingRunScorerIndex] = {
        player: editedRunScorerPlayer,
        runs: editedRuns,
      };
      setRunScorerData(updatedData);
      setEditingRunScorerIndex(-1);
    }
  };

  const handleSaveIndividualScoreEdit = () => {
    if (editingIndividualScoreIndex !== -1) {
      const updatedData = [...individualScoreData];
      updatedData[editingIndividualScoreIndex] = {
        player: editedIndividualScorePlayer,
        score: editedScore,
      };
      setIndividualScoreData(updatedData);
      setEditingIndividualScoreIndex(-1);
    }
  };

  const handleSaveBowlingFigureEdit = () => {
    if (editingBowlingFigureIndex !== -1) {
      const updatedData = [...bowlingFigureData];
      updatedData[editingBowlingFigureIndex] = {
        player: editedBowlingFigurePlayer,
        figure: editedFigure,
      };
      setBowlingFigureData(updatedData);
      setEditingBowlingFigureIndex(-1);
    }
  };

  const handleSaveSixesEdit = () => {
    if (editingSixesIndex !== -1) {
      const updatedData = [...sixesData];
      updatedData[editingSixesIndex] = {
        player: editedSixesPlayer,
        sixes: editedSixes,
      };
      setSixesData(updatedData);
      setEditingSixesIndex(-1);
    }
  };

  const handleSaveFoursEdit = () => {
    if (editingFoursIndex !== -1) {
      const updatedData = [...foursData];
      updatedData[editingFoursIndex] = {
        player: editedFoursPlayer,
        fours: editedFours,
      };
      setFoursData(updatedData);
      setEditingFoursIndex(-1);
    }
  };

  // Part 2 ends here

  // Continue with Part 3 for the JSX render

  // Part 1...

  // Part 2...

  // Part 3 continues here
  return (
    <div>
      <Navbar />
      <div className="h-full font-poppins bg-black w-[100%] p-10">
        <div className="text-white text-center pt-8">
          <h1 className="text-4xl font-extrabold text-lime-400 mb-8">TOURNAMENT STATS</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
  
            {/* Highest Wicket Taker */}
            <div className="bg-purple-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 outline outline-purple-500 bg-black rounded-lg">Highest Wicket Taker</h2>
              {wicketData.map((player, index) => (
                <div key={index} className="mb-2">
                  <span className="text-lg font-semibold">
                    {player.player} - {player.wickets} wickets
                  </span>
                  {isAdmin && (
                    <button
                      className="ml-2 text-sm bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleWicketEditClick(index)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
  
            {/* Highest Run Scorer */}
            <div className="bg-orange-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 outline outline-orange-600 bg-black rounded-lg">Highest Run Scorer</h2>
              {runScorerData.map((player, index) => (
                <div key={index} className="mb-2">
                  <span className="text-lg font-semibold">
                    {player.player} - {player.runs} runs
                  </span>
                  {isAdmin && (
                    <button
                      className="ml-2 text-sm bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleRunScorerEditClick(index)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
  
            {/* Highest Individual Score */}
            <div className="bg-green-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 outline outline-green-400 bg-black rounded-lg">Highest Individual Score</h2>
              {individualScoreData.map((player, index) => (
                <div key={index} className="mb-2">
                  <span className="text-lg font-semibold">
                    {player.player} - {player.score} runs
                  </span>
                  {isAdmin && (
                    <button
                      className="ml-2 text-sm bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleIndividualScoreEditClick(index)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
  
            {/* Best Bowling Figure */}
            <div className="bg-blue-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 outline outline-blue-400 bg-black rounded-lg">Best Bowling Figure</h2>
              {bowlingFigureData.map((player, index) => (
                <div key={index} className="mb-2">
                  <span className="text-lg font-semibold">
                    {player.player} - {player.figure}
                  </span>
                  {isAdmin && (
                    <button
                      className="ml-2 text-sm bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleBowlingFigureEditClick(index)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
  
            {/* Most Sixes */}
            <div className="bg-cyan-700 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 outline outline-cyan-400 bg-black rounded-lg">Most Sixes</h2>
              {sixesData.map((player, index) => (
                <div key={index} className="mb-2">
                  <span className="text-lg font-semibold">
                    {player.player} - {player.sixes} sixes
                  </span>
                  {isAdmin && (
                    <button
                      className="ml-2 text-sm bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleSixesEditClick(index)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
  
            {/* Most Fours */}
            <div className="bg-teal-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 outline outline-teal-400 bg-black rounded-lg">Most Fours</h2>
              {foursData.map((player, index) => (
                <div key={index} className="mb-2">
                  <span className="text-lg font-semibold">
                    {player.player} - {player.fours} fours
                  </span>
                  {isAdmin && (
                    <button
                      className="ml-2 text-sm bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleFoursEditClick(index)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
  
          </div>
        </div>
      </div>

      {/* Modal for editing player details */}
      {(editingWicketIndex !== -1 ||
        editingRunScorerIndex !== -1 ||
        editingIndividualScoreIndex !== -1 ||
        editingBowlingFigureIndex !== -1 ||
        editingSixesIndex !== -1 ||
        editingFoursIndex !== -1) && (
          <div className="fixed top-0 left-0 font-poppins w-full h-full  text-lime-400 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-gray-700 border-green-600 p-12 rounded-lg">
              <h2 className="text-3xl text-yellow-400 font-bold mb-2">Edit Player Details</h2>
              <div className="mb-2">
                <label className="block text-xl text-lime-400 font-semibold py-2">Player Name:</label>
                <input
                  type="text"
                  value={
                    editingWicketIndex !== -1
                      ? editedWicketPlayer
                      : editingRunScorerIndex !== -1
                        ? editedRunScorerPlayer
                        : editingIndividualScoreIndex !== -1
                          ? editedIndividualScorePlayer
                          : editingBowlingFigureIndex !== -1
                            ? editedBowlingFigurePlayer
                            : editingSixesIndex !== -1
                              ? editedSixesPlayer
                              : editedFoursPlayer
                  }
                  onChange={(e) =>
                    editingWicketIndex !== -1
                      ? setEditedWicketPlayer(e.target.value)
                      : editingRunScorerIndex !== -1
                        ? setEditedRunScorerPlayer(e.target.value)
                        : editingIndividualScoreIndex !== -1
                          ? setEditedIndividualScorePlayer(e.target.value)
                          : editingBowlingFigureIndex !== -1
                            ? setEditedBowlingFigurePlayer(e.target.value)
                            : editingSixesIndex !== -1
                              ? setEditedSixesPlayer(e.target.value)
                              : setEditedFoursPlayer(e.target.value)
                  }
                  className="w-full border rounded px-2 py-1 bg-gray-800 text-white"
                />
              </div>
              <div className="mb-2 ">
                <label className="py-2 block font-semibold text-xl">
                  {editingWicketIndex !== -1
                    ? "Wickets Taken:"
                    : editingRunScorerIndex !== -1
                      ? "Runs:"
                      : editingIndividualScoreIndex !== -1
                        ? "Score:"
                        : editingBowlingFigureIndex !== -1
                          ? "Best Bowling Figure:"
                          : editingSixesIndex !== -1
                            ? "Sixes:"
                            : "Fours:"}
                </label>
                <input
                  type="number"
                  value={
                    editingWicketIndex !== -1
                      ? editedWickets
                      : editingRunScorerIndex !== -1
                        ? editedRuns
                        : editingIndividualScoreIndex !== -1
                          ? editedScore
                          : editingBowlingFigureIndex !== -1
                            ? editedFigure
                            : editingSixesIndex !== -1
                              ? editedSixes
                              : editedFours
                  }
                  onChange={(e) =>
                    editingWicketIndex !== -1
                      ? setEditedWickets(e.target.value)
                      : editingRunScorerIndex !== -1
                        ? setEditedRuns(e.target.value)
                        : editingIndividualScoreIndex !== -1
                          ? setEditedScore(e.target.value)
                          : editingBowlingFigureIndex !== -1
                            ? setEditedFigure(e.target.value)
                            : editingSixesIndex !== -1
                              ? setEditedSixes(e.target.value)
                              : setEditedFours(e.target.value)
                  }
                  className="w-full border rounded px-2 py-1 bg-gray-800 text-white"
                />
              </div>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded items-center"
                onClick={() =>
                  editingWicketIndex !== -1
                    ? handleSaveWicketEdit()
                    : editingRunScorerIndex !== -1
                      ? handleSaveRunScorerEdit()
                      : editingIndividualScoreIndex !== -1
                        ? handleSaveIndividualScoreEdit()
                        : editingBowlingFigureIndex !== -1
                          ? handleSaveBowlingFigureEdit()
                          : editingSixesIndex !== -1
                            ? handleSaveSixesEdit()
                            : handleSaveFoursEdit()
                }
              >
                Save
              </button>
            </div>
          </div>
        )}

      <Footer />
    </div>
  );
}

export default Stats;
