// src/AboutUs.js
import React from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'John Doe',
    position: 'CEO',
    imgSrc: '/path-to-john-image.jpg',
    bio: 'John is the visionary behind our job app, bringing years of industry experience.',
  },
  {
    name: 'Jane Smith',
    position: 'CTO',
    imgSrc: '/path-to-jane-image.jpg',
    bio: 'Jane leads our technology team, ensuring our app is cutting-edge and reliable.',
  },
  // Add more team members as needed
];

const About = () => {
  return (
    <div className="bg-white text-gray-800 py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-darkGreen">About Us</h2>
          <p className="text-lg">Learn more about our mission, values, and the team behind our job app.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-semibold mb-6 text-darkGreen">Our Mission</h3>
          <p className="text-lg leading-relaxed">
            Our mission is to connect job seekers with their dream jobs and employers with the best talent.
            We believe in creating a transparent, efficient, and enjoyable job search experience for everyone.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-semibold mb-6 text-darkGreen">Our Values</h3>
          <ul className="text-lg leading-relaxed list-disc list-inside">
            <li>Integrity: We uphold the highest standards of integrity in all our actions.</li>
            <li>Innovation: We strive for continuous improvement and innovation.</li>
            <li>Customer Focus: We are committed to meeting our customers' needs and exceeding their expectations.</li>
            <li>Collaboration: We believe in the power of teamwork and collaboration.</li>
          </ul>
        </motion.div>

        <div>
          <h3 className="text-3xl font-semibold mb-6 text-darkGreen text-center">Meet Our Team</h3>
          <div className="flex flex-wrap justify-center">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="w-full sm:w-1/2 lg:w-1/4 p-4 text-center"
              >
                <img
                  src={member.imgSrc}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
                <p className="text-gray-600 mb-2">{member.position}</p>
                <p className="text-gray-700">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
