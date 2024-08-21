import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUpload, FaUser } from 'react-icons/fa'; // Use icons for a modern look

const Modern = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-transparent text-white p-4 shadow-lg flex justify-between items-center transition-all duration-300 ease-in-out" id="navbar">
      <div className="text-2xl font-bold">
        <Link to="/" className="hover:text-gray-300 transition-colors">VideoPlatform</Link>
      </div>
      <nav className="space-x-6">
        <Link to="/home" className="flex items-center hover:text-gray-300 transition-colors">
          <FaHome className="mr-2" />
          Home
        </Link>
        <Link to="/upload" className="flex items-center hover:text-gray-300 transition-colors">
          <FaUpload className="mr-2" />
          Upload
        </Link>
        <Link to="/profile" className="flex items-center hover:text-gray-300 transition-colors">
          <FaUser className="mr-2" />
          Profile
        </Link>
      </nav>
    </header>
  );
};

export default Modern;
