import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function generateFixtures(teams) {
  const fixtures = [];
  const teamCount = teams.length;

  // Generate a round-robin schedule
  for (let i = 0; i < teamCount; i++) {
    for (let j = i + 1; j < teamCount; j++) {
      fixtures.push({
        match: `${teams[i]} vs ${teams[j]}`,
      });
      fixtures.push({
        match: `${teams[j]} vs ${teams[i]}`,
      });
    }
  }

  // Shuffle the fixtures
  const shuffledFixtures = shuffleArray(fixtures);

  let currentDate = new Date(2024, 1, 2); // Start from February 1st, 2024
  const dailyFixtures = [];
  let matchesScheduledForCurrentDate = 0;

  shuffledFixtures.forEach((fixture, index) => {
    if (matchesScheduledForCurrentDate < 1) {
      dailyFixtures.push({
        date: currentDate.toISOString().split('T')[0],
        match: fixture.match,
      });
      matchesScheduledForCurrentDate++;
    } else {
      currentDate.setDate(currentDate.getDate() + 1);
      matchesScheduledForCurrentDate = 0;
      dailyFixtures.push({
        date: currentDate.toISOString().split('T')[0],
        match: fixture.match,
      });
      matchesScheduledForCurrentDate++;
    }
  });

  dailyFixtures.push({ date: "TBD", match: "Qualifier 1 : 1st vs 2nd" });
  dailyFixtures.push({ date: "TBD", match: "Eliminator : 3rd vs 4th" });
  dailyFixtures.push({ date: "TBD", match: "Qualifier 2 : Loser Qualifier 1 vs Winner Eliminator" });

  // Final match placeholder
  const finalMatch = {
    date: "TBD",
    match: "Final - Winner Qualifier 1 vs Winner Qualifier 2",
  };

  return { dailyFixtures, finalMatch };
}

function Matches() {
  const teams = [
    "Cumilla Victorians",
    "Chattogram Challengers",
    "Dhaka Dominators",
    "Fortune Barishal",
    "Rangpur Riders",
    "Sylhet Strikers",
  ];

  const [selectedTeam, setSelectedTeam] = useState("");
  const { dailyFixtures, finalMatch } = generateFixtures(teams);
  const groupStageFixtures = dailyFixtures.filter(fixture => !fixture.match.includes('Qualifier') && !fixture.match.includes('Eliminator') && !fixture.match.includes('Final'));
  const playoffFixtures = dailyFixtures.filter(fixture => fixture.match.includes('Qualifier') || fixture.match.includes('Eliminator'));

  const filteredFixtures = selectedTeam ? groupStageFixtures.filter(fixture => fixture.match.includes(selectedTeam)) : groupStageFixtures;

  const gradients = [
    "bg-gradient-to-r from-blue-300 to-blue-500",
    "bg-gradient-to-r from-green-300 to-teal-500",
    "bg-gradient-to-r from-purple-300 to-indigo-500",
    "bg-gradient-to-r from-pink-300 to-rose-500",
    "bg-gradient-to-r from-yellow-300 to-orange-500",
    "bg-gradient-to-r from-cyan-300 to-sky-500",
  ];

  return (
    <div>
      <Navbar />
      <h1 className="font-extrabold font-poppins text-4xl text-lime-500 py-2 text-center">FIXTURES</h1>

      <div className="flex justify-center my-4">
        <select className="border border-lime-300 text-white font-poppins bg-gray-900 p-2 rounded" onChange={(e) => setSelectedTeam(e.target.value)}>
          <option value="">Select a Team</option>
          {teams.map((team, index) => (
            <option key={index} value={team}>{team}</option>
          ))}
        </select>
      </div>

      <div className="h-[85vh] bg-black w-full font-poppins flex flex-col items-center overflow-auto py-4">
        <h2 className="font-bold text-xl text-green-500 mb-4">Group Stage Matches</h2>
        <div className="flex flex-wrap justify-center">
          {filteredFixtures.map((fixture, index) => (
            <div key={index} className={`${gradients[index % gradients.length]} m-2 p-4 rounded shadow-md w-1/4`}>
              <div className="text-lg font-semibold text-center">{formatDate(fixture.date)}</div>
              <div className="text-lg text-center">{fixture.match}</div>
            </div>
          ))}
        </div>

        <h2 className="font-bold text-xl text-cyan-400 my-4">Playoff Matches</h2>
        <div className="flex flex-wrap justify-center">
          {playoffFixtures.map((fixture, index) => (
            <div key={index} className={`${gradients[index % gradients.length]} m-2 p-4 rounded shadow-md w-1/4`}>
              <div className="text-lg font-semibold text-center">{fixture.date === 'TBD' ? fixture.date : formatDate(fixture.date)}</div>
              <div className="text-lg text-center">{fixture.match}</div>
            </div>
          ))}
        </div>

        <h2 className="font-bold text-xl text-yellow-400 my-4">Final Match</h2>
        <div className={`${gradients[finalMatch.match.length % gradients.length]} m-2 p-4 rounded shadow-md w-1/4`}>
          <div className="text-lg font-semibold text-center">{finalMatch.date === 'TBD' ? finalMatch.date : formatDate(finalMatch.date)}</div>
          {finalMatch.date === 'TBD' ? (
            <div className="text-lg font-bold text-center">Final match : Winner Qualifier 1 and Winner Qualifier 2</div>
          ) : (
            <div className="text-lg">{finalMatch.match}</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Matches;
