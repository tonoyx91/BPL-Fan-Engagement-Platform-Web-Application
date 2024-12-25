import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./quiz.css";

function Quiz() {
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(25);
  const [questions, setQuestions] = useState([]);
  const [timerInterval, setTimerInterval] = useState(null);

  // Helper Functions
  const optionClicked = (selectedOption) => {
    const currentQuestionData = questions[currentQuestion];

    if (!currentQuestionData || !currentQuestionData.correct) {
      console.error("Invalid question data");
      return;
    }

    const isCorrect = selectedOption === currentQuestionData.correct;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      // Advance to the next question
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      // Quiz is finished when all questions are answered
      setShowResults(true);
      clearInterval(timerInterval); // Clear the timer when the quiz is finished
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);

    // Reset the timer to 25 seconds
    setTimer(25);
  };

  useEffect(() => {
    // Countdown timer for 25 seconds
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        // Automatically finish the quiz after 20 seconds
        setShowResults(true);
        clearInterval(countdown);
      }
    }, 1000); // Update every 1 second

    setTimerInterval(countdown); // Save the interval ID in state

    return () => clearInterval(countdown);
  }, [timer]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-all-quiz-questions");
        console.log(response.data); // Log the response to the console
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div>
      <Navbar />
      <div className="App">
        {/* 1. Header */}
        <h1 className="font-extrabold font-poppins text-4xl text-yellow-500 pt-6 py-7" align="Center">
          PLAY QUIZ
        </h1>

        <div className="timer">
          <h2 className="font-extrabold font-poppins text-2xl text-white pt-4 py-4" align="Center">
            Time Left: {timer} seconds
          </h2>
        </div>

        {/* 2. Current Score */}
        <h2 className="font-extrabold font-poppins text-3xl text-white pt-4 py-5" align="Center">
          Score: {score}
        </h2>

        {/* 3. Show results or show the question game */}
        {showResults ? (
          /* 4. Final Results */
          <div className="final-results">
            <h1 className="font-extrabold font-poppins text-3xl text-yellow-300 pt-3" align="Center">
              Final Score
            </h1>
            <h2 className="font-extrabold font-poppins text-2xl text-white pt-5 py-12" align="Center">
              {score} out of {questions.length} correct - ({(score / questions.length) * 100}%)
            </h2>
            <button
              onClick={() => restartGame()}
              className="font-extrabold font-poppins text-xl bg-blue-400 text-black py-3 px-6 rounded-md hover:bg-yellow-400"
            >
              Restart Game
            </button>
          </div>
        ) : (
          /* 5. Question Card */
          <div className="question-card font-poppins font-normal">
            {/* Current Question */}
            <h2>
              Question: {currentQuestion + 1} out of {questions.length}
            </h2>
            <h3 className="question-text font-poppins font-bold py-5">
              {questions[currentQuestion]?.question}
            </h3>

            {/* List of possible answers */}
            
            <ul>
              {questions[currentQuestion]?.option1 && [1, 2, 3, 4].map((optionNumber) => (
                <li
                  key={optionNumber}
                  onClick={() => optionClicked(questions[currentQuestion][`option${optionNumber}`])}
                  className="interactive-li"
                >
                  {questions[currentQuestion][`option${optionNumber}`]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="h-[10vh] w-[100%]"></div>
      <Footer />
    </div>
  );
}

export default Quiz;
