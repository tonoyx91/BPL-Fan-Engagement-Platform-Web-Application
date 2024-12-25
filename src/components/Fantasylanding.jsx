import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";

function FantasyLanding() {
  const [countdown, setCountdown] = useState(1);
  const [currentDate, setCurrentDate] = useState("");
  const [nextDate, setNextDate] = useState("");
  const [fantasyTeamName, setFantasyTeamName] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const [seasonPoints, setSeasonPoints] = useState(0);
  const [matchDayPoints, setMatchDayPoints] = useState(0); // New state for matchday points

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentTargetTime = new Date(now);
      currentTargetTime.setHours(14, 0, 0, 0);

      const nextTargetDate = new Date(now);
      nextTargetDate.setDate(nextTargetDate.getDate() + 1);
      nextTargetDate.setHours(14, 0, 0, 0);

      const currentDateRemaining = calculateTimeRemaining(currentTargetTime);
      const nextDateRemaining = calculateTimeRemaining(nextTargetDate);

      const fetchTotalPoints = async () => {
        try {
          const teamname = fantasyTeamName;
          const date2 = new Date().toLocaleDateString("en-US");
          const date = formatDate(date2);

          const response = await axios.post("http://localhost:5000/getTotalPoints", {
            teamname,
            date,
          });

          setTotalPoints(response.data.totalPoints);

          // Fetch rank after updating total points
          fetchRank(teamname);
        } catch (error) {
          console.error("Error fetching total points:", error);
        }
      };

      // Fetch total points every 5 minutes
      const totalPointsTimer = setInterval(() => {
        fetchTotalPoints();
      }, 5 * 60 * 1000);

      if (currentDateRemaining > 0) {
        setCurrentDate(now.toLocaleDateString("en-US"));
        setNextDate(null);
        setCountdown(Math.floor(currentDateRemaining / 1000));
      } else {
        setCurrentDate(null);
        setNextDate(nextTargetDate);
        setCountdown(Math.floor(nextDateRemaining / 1000));
      }
    }, 1000);

    const userEmail = localStorage.getItem("email");
    fetchUserData(userEmail);

    // Fetch user data every 5 minutes
    const userDataTimer = setInterval(() => {
      fetchUserData(userEmail);
    }, 5 * 60 * 1000);

    // Fetch rank
    const fetchRank = async (teamname) => {
      try {
        const response = await axios.post("http://localhost:5000/generateRank", {
          teamname,
        });

        // Update the state with the fetched rank
        setMatchDayPoints(response.data.rank);
      } catch (error) {
        console.error("Error fetching rank:", error);
      }
    };

    // Fetch total points
    const fetchTotalPoints = async () => {
      try {
        const teamname = fantasyTeamName;
        const date2 = new Date().toLocaleDateString("en-US");
        const date = formatDate(date2);

        const response = await axios.post("http://localhost:5000/getTotalPoints", {
          teamname,
          date,
        });

        // Update the state with the fetched total points
        setTotalPoints(response.data.totalPoints);

        // Fetch rank after updating total points
        fetchRank(teamname);
      } catch (error) {
        console.error("Error fetching total points:", error);
      }
    };

    // Fetch total points every 5 minutes
    const totalPointsTimer = setInterval(() => {
      fetchTotalPoints();
    }, 5 * 60 * 1000);

    // Fetch season points
    const fetchSeasonPoints = async () => {
      try {
        const teamname = fantasyTeamName;

        const response = await axios.post("http://localhost:5000/getTotalPointsByTeam", {
          teamname,
        });

        // Update the state with the fetched season points
        setSeasonPoints(response.data.totalPoints);
      } catch (error) {
        console.error("Error fetching season points:", error);
      }
    };

    fetchTotalPoints();
    fetchSeasonPoints();

    // Fetch season points every 5 minutes
    const seasonPointsTimer = setInterval(() => {
      fetchSeasonPoints();
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(timer);
      clearInterval(userDataTimer);
      clearInterval(totalPointsTimer);
      clearInterval(seasonPointsTimer);
    };
  }, [fantasyTeamName]); // Include fantasyTeamName in the dependency array to re-run the effect when it changes

  const calculateTimeRemaining = (targetTime) => {
    let timeRemaining = targetTime - new Date();

    if (timeRemaining < 0) {
      const nextDay = new Date(new Date().setDate(new Date().getDate() + 1));
      nextDay.setHours(14, 0, 0, 0);
      targetTime = nextDay;
      timeRemaining = targetTime - new Date();
    }

    return timeRemaining;
  };

  const fetchUserData = async (email) => {
    try {
      const response = await axios.post("http://localhost:5000/user-profile-check", { email });
      const userData = response.data;

      setFantasyTeamName(userData?.fantasyTeam || "Add your team name from the profile page");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Navbar />
      <div className="w-[100%] bg-black">
        <div className="font-poppins text-xl font-bold items-center justify-center pt-8 relative bg- text-white">
          <div className="text-5xl text-lime-400 mb-4 text-center">Fantasy League</div>
          <div className="text-3xl text-lime-400 mb-10 text-center">
            Match Day {currentDate} - {nextDate}
          </div>
          <div className="flex justify-center gap-44 mb-10 p-10">
            <div className="text-center">
              <h2 className="text-2xl text-blue-400 mb-2 align-middle">Team</h2>
              <p className="text-5xl text-red-600">{fantasyTeamName}</p>
            </div>
          </div>
          <div className="flex gap-20 justify-center items-center pb-10">
            <div>
              <h2 className="text-2xl text-blue-400 mb-2">Rank</h2>
              <p className="bg-green-500 text-white font-poppins font-bold rounded p-4 cursor-pointer transition duration-300 text-center">
                {matchDayPoints} {/* Display rank here */}
              </p>
            </div>
            <div>
              <h2 className="text-2xl text-blue-400 mb-2">Season Points</h2>
              <p className="bg-green-500 text-white font-poppins font-bold rounded p-4 cursor-pointer transition duration-300 text-center">
                {seasonPoints}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center p-10">
            <button
              className="bg-amber-400 text-white font-poppins font-bold rounded p-4 cursor-pointer transition duration-300"
              onClick={() => (window.location.href = "/fantasy")}
            >
              Leaderboard
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full h-2 bg-green-500"></div>
          </div>
          <div className="justify-center items-center p-40">
            <h2 className="text-6xl text-orange-500 mb-2 text-center">
              MatchDay {nextDate instanceof Date ? nextDate.toLocaleDateString("en-US") : ""}
            </h2>
            <h2 className="text-4xl text-blue-400 mb-2 text-center">
              Select your Team for next MatchDay{" "}
              {nextDate instanceof Date ? nextDate.toLocaleDateString("en-US") : ""}!
            </h2>
            <div className="flex justify-center items-center p-20">
              <p className="text-2xl text-gray-500">
                {countdown === 1 ? "Transfer opens in:" : "Time until next MatchDay:"}
              </p>
              <p className="text-4xl font-bold text-green-500 ml-2">
                {countdown > 0
                  ? `${Math.floor(countdown / 3600)}h ${Math.floor((countdown % 3600) / 60)}m ${
                      countdown % 60
                    }s`
                  : "Loading..."}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <button
                className="bg-green-500 text-white font-poppins font-bold rounded p-4 cursor-pointer transition duration-300"
                onClick={() => (window.location.href = "/fantasy")}
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default FantasyLanding;
