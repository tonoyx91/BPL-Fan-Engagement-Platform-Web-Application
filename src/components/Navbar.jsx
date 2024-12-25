import React, { useState, useEffect } from "react";
import Login from "./LoginForm";
import SignUp from "./SignUp";
import axios from "axios";

export default function Navbar() {
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showSignUpAlert, setShowSignUpAlert] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleLoginClick = () => {
    setShowLoginAlert(true);
  };

  const handleSignUpClick = () => {
    setShowSignUpAlert(true);
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      axios
        .post("http://localhost:5000/user-profile-check", { email: userEmail })
        .then((response) => {
          const userDetails = response.data;
          if (userDetails && userDetails.profileImage) {
            setProfileImage(userDetails.profileImage);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  function getEmailUsername(email) {
    const parts = email.split('@');
    return parts.length === 2 ? parts[0] : email;
  }

  const handleFantasyClick = () => {
    const userEmail = localStorage.getItem("email");
    const currentDate = new Date().toISOString().split('T')[0];

    if(userEmail === "admin.bpl.23@gmail.com"){
      window.location.href = '/fantasyadmin';
    }else if (userEmail) {
      // Update the fantasy scores through the API
      window.location.href = '/fantasylanding';
      axios
        .post("http://localhost:5000/updateFantasyScores", { email: userEmail, date: currentDate })
        .then((response) => {
          const { totalPoints } = response.data;
          // Navigate to the fantasylanding page         
          alert(`Fantasy scores updated successfully. Total points: ${totalPoints}`);
        })
        .catch((error) => {
          console.error('Error updating fantasy scores:', error);
          alert("Failed to update fantasy scores. Please try again.");
        });
    }else{
      alert("Please login first");
    }
  };

  return (
    <>
      <div className="bg-[#0E3600] flex justify-between">
        <div className="flex items-center relative">
          <img src="navbar/bpl.svg" className="w-32 absolute top-1" alt="Logo" />
          <h1 className="font-extrabold font-poppins text-3xl text-yellow-400 pl-28 pt-3">
            <button onClick={() => window.location.href = '/'}>
              BANGLADESH PREMIER LEAGUE
            </button>
          </h1>
        </div>
        <div>
          <ul className="flex items-center gap-6 py-0 text-lg font-bold text-yellow-400 pr-4 pb-2 pt-4">
            {localStorage.getItem("email") ? (
              <>
                <li>{getEmailUsername(localStorage.getItem("email"))}</li>
                <li>
                  <button onClick={() => { localStorage.clear(); window.location.reload(); }}>
                    Logout
                  </button>
                </li>
                <li>
                  <button onClick={() => window.location.href = '/profile'}>
                    {profileImage ? (
                      <img src={profileImage} className="w-12 rounded-full" alt="Profile" />
                    ) : (
                      <img src="navbar/profile.svg" className="w-12" alt="Profile" />
                    )}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li onClick={handleSignUpClick} style={{ cursor: "pointer" }}
                  className="hover:bg-blue-600 hover:text-white transition duration-150 ease-in-out">
                  Sign Up
                </li>
                <li onClick={handleLoginClick} style={{ cursor: "pointer" }}
                  className="hover:bg-blue-600 hover:text-white transition duration-150 ease-in-out">
                  Login
                </li>
                <li>
                  <img src="navbar/profile.svg" className="w-12" alt="Profile" />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div>
        <ul className="flex font-poppins font-extrabold text-base gap-6 justify-end bg-[#0E3600] text-white pr-4 pb-2">
          <li>
            <button onClick={() => window.location.href = '/'}
              className="hover:bg-blue-600  hover:text-white transition duration-150 ease-in-out">HOME</button>
          </li>
          <li>
            <button onClick={() => window.location.href = '/matches'}
              className="hover:bg-blue-600 hover:text-white transition duration-150 ease-in-out">MATCHES</button>
          </li>
          <li>
            <button onClick={() => window.location.href = '/teams'}
              className="hover:bg-blue-600 hover:text-white transition duration-150 ease-in-out">TEAMS</button>
          </li>
          <li>
            <button onClick={() => {
                window.location.href = '/pointtable';
              }
            } className="hover:bg-blue-600 hover:text-white transition duration-150 ease-in-out">
              POINTS TABLE
            </button>
          </li>
          <li>
            <button onClick={() => window.location.href = '/highlights'}
              className="hover:bg-blue-600 hover:text-white transition duration-150 ease-in-out">HIGHLIGHTS</button>
          </li>
          <li>
            <button onClick={handleFantasyClick} className="hover:bg-blue-600 hover:text-white transition duration-150 ease-in-out">
              FANTASY
            </button>
          </li>

          <li>
            <button onClick={() => window.location.href = '/stats'}
              className="hover:bg-blue-600 hover:text-white transition duration-150 ease-in-out">STATS</button>
          </li>
          <li>
            <button onClick={() => {
              const email = localStorage.getItem("email");
              if (email) {
                window.location.href = '/tickets';
              } else {
                alert("You need to login first");
              }
            }}
              className="hover:bg-blue-600 hover:text-white transition duration-150 ease-in-out">
              TICKETS
            </button>
          </li>
          <li>
            <button onClick={() => window.location.href = '/community'}
              className="hover:bg-blue-600 hover:text-white transition duration-150 ease-in-out">COMMUNITY</button>
          </li>

        </ul>
      </div>
      {showLoginAlert && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="p-4 rounded shadow-md text-center">
            <Login />
            <button
              className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-red-600"
              onClick={() => setShowLoginAlert(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showSignUpAlert && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="p-9 rounded shadow-md text-center">
            <SignUp />
            <button
              className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover-bg-red-600"
              onClick={() => setShowSignUpAlert(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
