import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Teams() {
  const isAdmin = localStorage.getItem("email") === "admin.bpl.23@gmail.com";

  return (
    <div>
      <Navbar />
      <div className="h-full bg-black w-[100%]">
        <h1 className="font-extrabold font-rowdies text-6xl text-yellow-500 pt-3" align="Center">
          TEAMS
        </h1>

        <div className="font-poppins text-lg font-light items-center justify-center pt-8 relative bg-black">
          {/* <div
          className="absolute inset-0 bg-[url('/bg-1.png')] bg-contain bg-opacity-10 backdrop-opacity-10 opacity-2 opacity-30"
          style={{ zIndex: -1 }}
        ></div> */}
          <div className="flex flex-col justify-center items-center mb-10">
            <ul className="flex font-rowdies font-bold text-base gap-6 justify-end text-white pr-4 pb-2">
              <li>
                <button onClick={() => (window.location.href = "/barishal")}>
                  <img src="/Barishal.png" alt="" />
                </button>
              </li>
              <li>
                <button onClick={() => (window.location.href = "/comilla")}>
                  <img src="/Comilla.png" alt="" />
                </button>
              </li>
              <li>
                <button onClick={() => (window.location.href = "/dhaka")}>
                  <img src="/Dhaka.png" alt="" />
                </button>
              </li>
            </ul>
            <ul className="flex font-rowdies font-bold text-base gap-6 justify-end text-white pr-4 pb-2">
              <li>
                <button onClick={() => (window.location.href = "/chattogram")}>
                  <img src="/Chattogram.png" alt="" />
                </button>
              </li>
              <li>
                <button onClick={() => (window.location.href = "/rangpur")}>
                  <img src="/Rangpur.png" alt="" />
                </button>
              </li>
              <li>
                <button onClick={() => (window.location.href = "/sylhet")}>
                  <img src="/Sylhet.png" alt="" />
                </button>
              </li>
            </ul>
            {isAdmin && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition duration-150 ease-in-out"
                onClick={() => {
                  // Handle the click event for admin
                  // You can navigate to the Add Teams Details page or show a modal, etc.
                  (window.location.href = "/teamdetails")
                }}
              >
                Add Teams Details
              </button>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Teams;
