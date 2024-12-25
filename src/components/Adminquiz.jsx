/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";

function Adminquiz() {
  const [quizData, setQuizData] = useState({
    questions: [
      { questionNumber: 1, question: "", options: ["", "", "", ""], correctOption: "" },
      { questionNumber: 2, question: "", options: ["", "", "", ""], correctOption: "" },
      { questionNumber: 3, question: "", options: ["", "", "", ""], correctOption: "" },
      { questionNumber: 4, question: "", options: ["", "", "", ""], correctOption: "" },
      { questionNumber: 5, question: "", options: ["", "", "", ""], correctOption: "" },
    ],
  });

  const handleQuestionChange = (index, value) => {
    setQuizData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[index].question = value;
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setQuizData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const handleCorrectOptionChange = (questionIndex, value) => {
    setQuizData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[questionIndex].correctOption = value;
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const handleAddQuiz = async () => {
    try {
      // Modify the data structure to match the backend expectations
      const formattedQuizData = quizData.questions.map(({ questionNumber, question, options, correctOption }) => ({
        questionNumber,
        question,
        option1: options[0],
        option2: options[1],
        option3: options[2],
        option4: options[3],
        correct: correctOption,
      }));
  
      // Send a PUT request to update quiz questions
      console.log(formattedQuizData);
      const response = await axios.put("http://localhost:5000/update-quiz-questions", formattedQuizData);
  
      // Log the response from the server
      console.log(response.data);
  
      // Reset the input fields after adding the quiz
      setQuizData({
        questions: [
          { questionNumber: 1, question: "", options: ["", "", "", ""], correctOption: "" },
          { questionNumber: 2, question: "", options: ["", "", "", ""], correctOption: "" },
          { questionNumber: 3, question: "", options: ["", "", "", ""], correctOption: "" },
          { questionNumber: 4, question: "", options: ["", "", "", ""], correctOption: "" },
          { questionNumber: 5, question: "", options: ["", "", "", ""], correctOption: "" },
        ],
      });
    } catch (error) {
      console.error("Error occurred during API call:", error);
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="h-full bg-black w-[100%] font-poppins">
        <div className="m-10">
          <h1 className="text-lime-400 text-3xl uppercase font-bold font-poppins mb-6 text-center ">Add Quiz</h1>
          {quizData.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-4">
              <label className="text-white">Question {question.questionNumber}:</label>
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                placeholder={`Enter question ${question.questionNumber}`}
                className="w-full px-3 py-2 mb-2 bg-gray-800 border border-gray-600 rounded-md text-white"
              />
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                    placeholder={`Enter option ${optionIndex + 1}`}
                    className="w-full px-3 py-2 mb-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                  />
                </div>
              ))}
              <label className="text-white">Correct Answer:</label>
              <input
                type="text"
                value={question.correctOption}
                onChange={(e) => handleCorrectOptionChange(questionIndex, e.target.value)}
                placeholder={`Enter correct answer for question ${question.questionNumber}`}
                className="w-full px-3 py-2 mb-2 bg-gray-800 border border-gray-600 rounded-md text-white"
              />
            </div>
          ))}
          <button
            onClick={handleAddQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Add Quiz
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Adminquiz;
