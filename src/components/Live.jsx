import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Live() {
  return (
    <div className="bg-[#0E3600]">
      <Navbar />
      <div id="score-frame">
        <iframe
          title="Live Cricket Scores"
          src="https://cwidget.crictimes.org/?v=1.1&a=544a2d&c=0b0baa"
          style={{ width: "100%", minHeight: "460px", border: "0" }}
          scrolling="yes"
        ></iframe>
      </div>
      <Footer />
    </div>
  );
}

export default Live;
