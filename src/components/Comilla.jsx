import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Comilla() {
  return (
    <div>
      <Navbar />
      <div className="h-[85vh] bg-black w-[100%]">
      <h1 className="font-extrabold font-rowdies text-6xl text-yellow-500 pt-3" align="Center">COMILLA VICTORIANS</h1>
      <div className="font-rowdies text-lg font-light items-center justify-center pt-8 relative bg-black">
        {/* <div
          className="absolute inset-0 bg-[url('/bg-1.png')] bg-contain bg-opacity-10 backdrop-opacity-10 opacity-2 opacity-30"
          style={{ zIndex: -1 }}
        ></div> */}
        <div className="flex flex-col justify-center items-center mb-10">
            
        <ul className="font-bold text-base gap-6 justify-end text-white pr-4 pb-2">
        <li>
          <button onClick={() => window.location.href = '/comilla'}><img src="/Comilla.jpg" alt=""/></button>
        </li>
        </ul>
        </div>
      </div>
      <Footer />
    </div>
    </div>
  );
}

export default Comilla;
