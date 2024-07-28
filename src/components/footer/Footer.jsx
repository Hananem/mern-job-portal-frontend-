// src/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-darkGreen text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
            <p>Terms of Service | Privacy Policy</p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <a href="#" className="text-white hover:text-gray-300">
              Facebook
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Twitter
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
