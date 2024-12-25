import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const Tickets = () => {
  const initialSeats = {
    "Grand Stand": 5000,
    "East Gallery": 10000,
    "South Gallery": 8000,
    "North Gallery": 8000,
    "VIP Box": 500,
  };

  const [selectedParts, setSelectedParts] = useState([]);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState(initialSeats);
  const [bookingInfo, setBookingInfo] = useState({
    date: "",
    quantity: 0,
    price: 0,
    totalPrice: 0,
    part: "",
  });

  const prices = {
    "East Gallery": 200,
    "North Gallery": 400,
    "South Gallery": 400,
    "Grand Stand": 600,
    "VIP Box": 3000,
  };

  const handleSeatSelection = (part) => {
    if (!selectedParts.includes(part)) {
      setSelectedParts([...selectedParts, part]);
      setBookingInfo({
        ...bookingInfo,
        part: part,
        price: prices[part],
        quantity: 0,
        totalPrice: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleBooking = () => {
    if (bookingInfo.date && bookingInfo.quantity) {
      // Proceed with booking logic
      const totalPrice = bookingInfo.quantity * bookingInfo.price;
      if (selectedSeats[bookingInfo.part] >= bookingInfo.quantity) {
        const remainingSeats = { ...selectedSeats };
        remainingSeats[bookingInfo.part] -= bookingInfo.quantity;
        axios
          .post("http://localhost:5000/create-ticket", {
            email: localStorage.getItem("email"),
            seatNumber: bookingInfo.quantity,
            date: bookingInfo.date,
            totalPrize: totalPrice,
            stand: bookingInfo.part,
          })
          .then((response) => {
            console.log("Ticket created successfully", response.data);
            const updatedBookingDetails = [...bookingDetails];
            updatedBookingDetails.push({ ...bookingInfo, totalPrice });
            setBookingDetails(updatedBookingDetails);
            setIsModalOpen(false);
            setSelectedSeats(remainingSeats);
          })
          .catch((error) => {
            console.error("Error while creating ticket", error);
            alert(
              "You can not Book More than 10 tickets for the Same Match Day! Change the Date or Amount!!"
            );
          });
      } else {
        alert("Not enough seats available for this stand.");
      }
    } else {
      alert("Please select a date and quantity of seats.");
    }
  };

  const renderOptions = (max) => {
    const options = [];
    for (let i = 1; i <= max; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const renderDates = () => {
    const dateOptions = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      dateOptions.push(
        <option key={i} value={formattedDate}>
          {formattedDate}
        </option>
      );
    }
    return dateOptions;
  };

  const renderDay = (date) => {
    const options = { weekday: "long" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  return (
    <div>
      <Navbar />
      <div className="h-full container mx-auto p-4 py-5">
        <h1 className="text-3xl font-poppins text-blue-200 font-extrabold text-center my-4">
          Ticket Booking System
        </h1>
        <p className="text-xl font-poppins text-green-300 text-center mb-4">
          Venue: Sher-e-Bangla National Cricket Stadium, Mirpur
        </p>

        {/* Stadium Shape */}
        <div className="relative mx-auto w-[500px] h-[380px] bg-gray-900 rounded-full overflow shadow-xl border border-green-800 bolder">
        
          {/* East Gallery */}
          <div
            onClick={() => handleSeatSelection("East Gallery")}
            className="seat absolute bg-blue-500 rounded-full w-40 h-12 transform -translate-y-2/4 translate-x-2/4 hover:bg-blue-700 cursor-pointer"
            style={{ top: "10%", left: "18%" }}
          >
            <button className="w-full h-full text-white font-poppins font-bold focus:outline-none">
              East Gallery
            </button>
          </div>

          {/* South Gallery */}
          <div
            onClick={() => handleSeatSelection("South Gallery")}
            className="seat absolute bg-green-500 rounded-full w-20 h-35 transform translate-y-2/4 translate-x-2/4 hover:bg-green-700 cursor-pointer"
            style={{ bottom: "50%", left: "75%" }}
          >
            <button className="w-full h-full text-white font-poppins font-bold focus:outline-none">
              South Gallery
            </button>
          </div>

          {/* North Gallery */}
          <div
            onClick={() => handleSeatSelection("North Gallery")}
            className="seat absolute bg-red-500 rounded-full w-20 h-35 transform translate-y-2/4 translate-x-2/4 hover:bg-red-700 cursor-pointer"
            style={{ bottom: "50%", right: "90%" }}
          >
            <button className="w-full h-full text-white font-poppins font-bold focus:outline-none">
              North Gallery
            </button>
          </div>

          <div
            //pitch
            className="seat absolute bg-gray-600 w-20 h-6 transform translate-y-2/4 translate-x-2/4 cursor-pointer"
            style={{ bottom: "50%", right: "50%" }}
          >
            <div className="w-full h-full text-yellow-300 text-center font-poppins font-bold focus:outline-none">
              Pitch
            </div>
          </div>

          {/* VIP Box */}
          <div
            onClick={() => handleSeatSelection("VIP Box")}
            className="seat absolute bg-purple-500 rounded-full w-20 h-12 transform translate-y-2/4 translate-x-2/4 hover:bg-purple-700 cursor-pointer"
            style={{ bottom: "10%", left: "20%" }}
          >
            <button className="w-full h-full text-white font-poppins font-bold focus:outline-none">
              VIP Box
            </button>
          </div>

          {/* Grand Stand */}
          <div
            onClick={() => handleSeatSelection("Grand Stand")}
            className="seat absolute bg-yellow-500 rounded-full w-20 h-12 transform translate-y-2/4 translate-x-2/4 hover:bg-yellow-700 cursor-pointer"
            style={{ bottom: "10%", left: "50%" }}
          >
            <button className="w-full h-full text-white font-poppins font-bold focus:outline-none">
              Grand Stand
            </button>
          </div>
        </div>

        <h2 className="text-2xl text-red-400 font-poppins font-bold py-2 text-center">
          Max 10 tickets per match day per person
        </h2>
        {selectedParts.length > 0 && (
          <div className="text-center my-4">
            <h2 className="text-2xl text-blue-400 font-poppins font-bold py-2">
              Seat Selection
            </h2>
            {selectedParts.map((part, index) => (
              <p
                key={index}
                className="text-green-200 font-poppins font-bold"
              >{`${part} - Total Seats: ${initialSeats[part]}, Seats Left: ${
                selectedSeats[part]
              }`}</p>
            ))}
          </div>
        )}
        {isModalOpen && (
          <div className="font-poppins fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-70">
            <div className="bg-gray-800 p-8 rounded-lg w-96 text-green-600">
              <h2 className="text-2xl font-poppins font-bold mb-4 text-center">
                Book Tickets
              </h2>
              <label className="block">
                Date:
                <select
                  value={bookingInfo.date}
                  onChange={(e) =>
                    setBookingInfo({ ...bookingInfo, date: e.target.value })
                  }
                  className="bg-gray-800 border border-gray-300 rounded-md w-full px-3 py-2 mb-4"
                >
                  <option value="">Select Date</option>
                  {renderDates()}
                </select>
              </label>
              <label className="block">
                Quantity:
                <select
                  value={bookingInfo.quantity}
                  onChange={(e) =>
                    setBookingInfo({
                      ...bookingInfo,
                      quantity: parseInt(e.target.value),
                    })
                  }
                  className="bg-gray-800 border border-gray-300 rounded-md w-full px-3 py-2 mb-4"
                >
                  <option value="">Select Quantity</option>
                  {renderOptions(10)}
                </select>
              </label>
              <label className="text-lime-300 font-poppins font-bold text-center block py-4">
                Unit Price: {bookingInfo.price} BDT
              </label>
              <label className="font-poppins font-bold text-center block py-5">
                Total Price: {bookingInfo.totalPrice} BDT
              </label>
              <button
                onClick={handleBooking}
                className="bg-blue-500 hover:bg-blue-700 text-white font-poppins font-bold py-2 px-4 rounded"
              >
                Book
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 hover:bg-red-700 font-poppins text-white font-bold py-2 px-4 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {bookingDetails.length > 0 && (
          <div className="text-center my-4">
            <h2 className="text-3xl text-green-400 font-poppins font-bold ">
              Booking Details
            </h2>
            {bookingDetails.map((booking, index) => (
              <textarea
                key={index}
                className="border font-poppins font-bold text-center border-gray-300 bg-gray-800 text-green-100 rounded-md w-full px-3 py-5 my-4"
                rows={5}
                value={`Gallery: ${booking.part}
                Date: ${renderDay(
                  booking.date
                )}, ${booking.date}\nQuantity: ${booking.quantity}\nUnit Price: ${booking.price
                } BDT\nTotal Price: ${booking.totalPrice} BDT`}
                readOnly
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Tickets;
