import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaBriefcase, FaUserFriends, FaChartLine } from 'react-icons/fa';

const services = [
  {
    icon: <FaSearch size={22} />,
    title: 'Job Search',
    description: 'Find your dream job with our extensive job listings and advanced search features.',
    color: '#3366CC',
  },
  {
    icon: <FaBriefcase size={22} />,
    title: 'Post Jobs',
    description: 'Employers can post job openings to attract the best candidates.',
    color: '#FF9900',
  },
  {
    icon: <FaUserFriends size={22} />,
    title: 'Networking',
    description: 'Connect with professionals and expand your network.',
    color: '#33CC99',
  },
  {
    icon: <FaChartLine size={22} />,
    title: 'Career Growth',
    description: 'Access resources and tools to advance your career.',
    color: '#FF3366',
  },
];

const WhatWeDo = () => {
  return (
    <div className="bg-white text-gray-800 py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-darkGreen">What We Do</h2>
          <p className="text-lg">Discover the features and services we offer to help you succeed in your career.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="w-full sm:w-1/2 lg:w-1/4 p-6 text-center"
            >
              <div className={`mb-4 mx-auto w-10 h-10 rounded-full ${service.color} transition-transform transform hover:scale-110 hover:shadow-lg`}>
                {service.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
              <p className="text-gray-700">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;

