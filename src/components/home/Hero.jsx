import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative bg-darkGreen text-white overflow-hidden">
      <div className="container mx-auto px-6 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 mb-8 md:mb-0"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-lg lg:text-xl mb-6">
              Search from thousands of job listings to find the perfect match for you.
            </p>
            <div className="flex space-x-4">
              <Link to="/jobs" className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-2 px-4 rounded-lg shadow-lg">
                Search Jobs
              </Link>
              <Link to="/create-job" className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white py-2 px-4 rounded-lg shadow-lg">
                Post a Job
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="relative">
              <img
                src="/path-to-your-illustration-or-image.jpg"
                alt="Job search illustration"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;