/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card } from "./Card";
import { QuizCard } from "./Quizcard";
import Footer from "./Footer";
import Navbar from "./Navbar";
import yourVideo from "/BPL2023.mp4";
import { PredictionCard } from "./CardPrediction";
import axios from "axios";

function Home() {
  const [news, setNews] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inboxValue, setInboxValue] = useState("");

  useEffect(() => {
    // Fetch news data from the backend when the component mounts
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/news/all");
        // Update the state with the received news data
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleAddNews = async () => {
    try {
      // Assuming the email is stored in localStorage with the key 'userEmail'
      const userEmail = localStorage.getItem("email");

      // Make a POST request to the news insertion API
      const response = await axios.post("http://localhost:5000/news/insert", {
        email: userEmail,
        date: new Date(),
        news: inputValue,
      });

      // Handle the response as needed
      console.log("News added successfully:", response.data);

      // Update the local state if needed
      setNews([...news, { date: new Date(), news: inputValue }]);
      setInputValue("");
    } catch (error) {
      console.error("Error adding news:", error);
      // Handle the error
    }
  };

  const handleSendInbox = () => {
    // Add logic to handle sending inbox message
    console.log("Sending inbox message:", inboxValue);
    // Clear the inboxValue if needed
    setInboxValue("");
  };

  return (
    <div>
      <Navbar />
      <div className="h-[85vh] bg-black w-[100%]">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover overflow-hidden "
          style={{ overflow: "hidden" }}
        >
          <source src={yourVideo} type="video/mp4" />
          Welcome to BPL 2024
        </video>
      </div>

      <div className="font-poppins font-bold flex items-center justify-around gap-7 bg-[#0c0e0c] py-8">
        <button onClick={() => (window.location.href = "/live")}>
          <Card
            obj={{
              title: "Live Score!",
              desc: "Follow all the live match updates here",
            }}
          />
        </button>
        <button onClick={() => {
          const userEmail = localStorage.getItem("email");

          if (userEmail) {
            window.location.href = '/prediction';
          } else {
            alert("Please login first");
          }
        }}>
          <PredictionCard
            obj={{
              title: "Predict The Winner",
              desc: "Predict the winner & Win Gifts!"
            }}
          />
        </button>

        <button onClick={() => {
          const userEmail = localStorage.getItem("email");

          if (userEmail === "admin.bpl.23@gmail.com") {
            window.location.href = '/adminquiz';
          } else if (userEmail) {
            window.location.href = '/quiz';
          } else {
            alert("Please login first");
          }
        }}>
          <QuizCard
            obj={{
              title: "PLAY QUIZ",
              desc: "Answer questions and Win Gifts!"
            }}
          />
        </button>

      </div>
      <div className="font-poppins text-bold font-bold items-center justify-center pt-8 relative bg-black">
        <div className="flex flex-col justify-center items-center mb-10">
          <p className="text-3xl items-start text-yellow-400 mb-5">Latest News Updates!!!</p>
          <div>
            {news.map((item, index) => (
              <p key={index} className="text-2xl leading-10 text-green-500">
                &#x2022; {item.news} ({new Date(item.date).toLocaleDateString()})
              </p>
            ))}
          </div>
          <div className="mt-4 text-green-500">
            {localStorage.getItem("email") === "admin.bpl.23@gmail.com" && (
              <>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border bg-black border-green-500 rounded-md w-full px-3 py-2 mb-2"
                  placeholder="Enter the latest news"
                />
                <button
                  onClick={handleAddNews}
                  className="mx-auto bg-gray-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                >
                  Add News
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-3xl text-yellow-400">Sponsors</h1>
          <div>
            <img src="./sponsor/Daraz.svg" alt="Daraz" />
          </div>
          <div className="flex pb-8 gap-8">
            <img src="./sponsor/is.svg" alt="IS" />
            <img src="./sponsor/mi.svg" alt="MI" />
            <img src="./sponsor/na.svg" alt="NA" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;


