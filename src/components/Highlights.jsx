import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import { useDropzone } from "react-dropzone";

function Highlights() {
  const [uploadedVideos, setUploadedVideos] = useState([]); // State to store uploaded videos

  const handleUpload = (acceptedFiles) => {
    // Logic to handle video upload
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Add the uploaded video to the state
        setUploadedVideos((prevVideos) => [
          ...prevVideos,
          { src: URL.createObjectURL(file), title: file.name },
        ]);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleUpload });

  return (
    <div>
      <Navbar />
      <div className="bg-black p-10 text-center">
        <h1 className="text-lime-400 font-extrabold text-3xl mb-3 mt-0 py-0 font-poppins">
          ENJOY THE HIGHLIGHTS
        </h1>
        <div className="flex flex-wrap justify-center">
          {/* Render the previously inserted videos */}
          <div className="mx-auto my-auto w-[35%]">
            <h2 className="text-white text-1.4rem font-poppins mb-2">
              Boom Boom Tamim Iqbal's 100 Run Against Dhaka Dynamites||BPL 2019
            </h2>
            <video
              className="w-full rounded-8"
              src="/highlight.mp4" // Replace with the actual source
              controls
            ></video>
          </div>
          <div className="mx-auto my-auto w-[35%]">
            <h2 className="text-white text-1.4rem font-poppins mb-2">
              🔥 AB de Villiers's 100 Run Against Dhaka Dynamites||BPL 2019
            </h2>
            <video
              className="w-full rounded-8"
              src="/Villiars.mp4" // Replace with the actual source
              controls
            ></video>
          </div>
          <div className="mx-auto my-auto w-[35%]">
            <h2 className="text-white text-1.4rem font-poppins mb-2">
              Maxwell Insane Innings against Afganistan!
            </h2>
            <video
              className="w-full rounded-8"
              src="" // Replace with the actual source
              controls
            ></video>
          </div>
          <div className="mx-auto my-auto w-[35%]">
            <h2 className="text-white text-1.4rem font-poppins mb-2">
              Get Ready For BPL!
            </h2>
            <video
              className="w-full rounded-8"
              src="/BPL2023.mp4" // Replace with the actual source
              controls
            ></video>
          </div>
          
          {/* Render the uploaded videos */}
          {uploadedVideos.map((video, index) => (
            <div key={index} className="mx-auto my-auto w-[35%]">
              <h2 className="text-white text-1.4rem font-poppins mb-2">
                {video.title}
              </h2>
              <video className="w-full rounded-8" src={video.src} controls></video>
            </div>
          ))}
        </div>
        <div className="mt-30">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <button className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600">
              Upload Videos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Highlights;
