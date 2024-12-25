import React from 'react';
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa';

function Footer() {
  const iconSize = 30; // Adjust the size as needed

  return (
    <div className='flex justify-between bg-[#0E3600] font-poppins text-white font-extralight'>
      <div className='font-poppins px-8 py-8'>
        <h1 className='font-poppins font-semibold pb-2'>About</h1>
        <p className='font normal pb-1'>All rights reserved to Bangladesh Cricket Board (BCB)</p>
        <span>©PhoenixDev</span>
      </div>
      <div className='font-poppins font-semibold px-8 py-8'> {/* Adjusted left padding */}
        <h1>Follow on Social Media</h1>
        <ul className="px-4 py-4 flex space-x-4">
          <li>
            <a href="https://www.facebook.com/BangladeshPremierLeague.official" target="_blank" rel="noopener noreferrer">
              <FaFacebook color="#3b5998" size={iconSize} />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UC5WSuKMi5BFEa2RGXPMc2ww" target="_blank" rel="noopener noreferrer">
              <FaYoutube color="#c4302b" size={iconSize} />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/bplt20official_/" target="_blank" rel="noopener noreferrer">
              <FaInstagram color="#e4405f" size={iconSize} />
            </a>
          </li>
        </ul>
      </div>
      <div className='p-6'>
        <h1 className='font-semibold pb-2'>Contact Us</h1>
        <h1 className='font-size:xl; pb-2'>0187854654</h1>
        <h1 className='pb-2'>sdpgroupB7@gmail.com</h1>
      </div>
    </div>
  );
}

export default Footer;
