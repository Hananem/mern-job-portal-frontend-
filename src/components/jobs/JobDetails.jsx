// src/JobDetails.js
import React from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaCalendarAlt, FaEnvelope, FaBookmark, FaEye } from 'react-icons/fa';

const jobDetails = {
  jobTitle: 'Senior Software Engineer',
  company: {
    name: 'Tech Innovators Inc.',
    logo: 'https://via.placeholder.com/50',
    description: 'A leading company in tech innovation.',
    contactEmail: 'contact@techinnovators.com'
  },
  location: 'San Francisco, CA',
  remote: true,
  salary: { min: 120000, max: 150000 },
  experienceLevel: 'Senior',
  employmentType: 'Full-time',
  category: 'Engineering',
  description: 'We are looking for a Senior Software Engineer to join our dynamic team.',
  responsibilities: 'Developing high-quality software solutions.',
  requirements: 'Proven experience in software engineering.',
  postedBy: 'HR Team',
  applicationDeadline: '2024-07-30',
  datePosted: '2024-06-18',
  views: 124
};

const JobDetails = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:px-8">
      <div className="relative bg-white shadow-md rounded-lg p-6 mb-6 hover:shadow-lg transition-shadow duration-300">
        {/* Save Icon */}
        <div className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-green-500 cursor-pointer">
          <FaBookmark size={24} />
        </div>

        {/* Job Title */}
        <h1 className="text-3xl font-bold text-teal-900 mb-4">{jobDetails.jobTitle}</h1>
        
        {/* Company Information */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Company Information</h2>
          <div className="flex items-center mb-2">
            {jobDetails.company.logo && (
              <img src={jobDetails.company.logo} alt="Company Logo" className="w-12 h-12 mr-3 rounded-full" />
            )}
            <div>
              <h3 className="text-lg font-medium text-gray-900">{jobDetails.company.name}</h3>
              <p className="text-sm text-gray-700">{jobDetails.company.description}</p>
              <div className="flex items-center text-sm text-gray-700 mt-1">
                <FaEnvelope className="mr-1" />
                <p>{jobDetails.company.contactEmail}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Job Details */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Job Details</h2>
          <div className="flex items-center text-lg mb-2">
            <FaMapMarkerAlt className="mr-2 text-teal-700" />
            <strong className="mr-2">Location:</strong>
            <span className="text-teal-700">{jobDetails.location}</span>
          </div>
          <div className="flex items-center text-lg mb-2">
            <FaCalendarAlt className="mr-2 text-teal-700" />
            <strong className="mr-2">Remote:</strong>
            <span className="text-teal-700">{jobDetails.remote ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex items-center text-lg mb-2">
            <FaDollarSign className="mr-2 text-teal-700" />
            <strong className="mr-2">Salary Range:</strong>
            <span className="text-teal-700">${jobDetails.salary.min} - ${jobDetails.salary.max}</span>
          </div>
          <p className="text-lg"><strong>Experience Level:</strong> <span className="text-teal-700">{jobDetails.experienceLevel}</span></p>
          <p className="text-lg"><strong>Employment Type:</strong> <span className="text-teal-700">{jobDetails.employmentType}</span></p>
          <p className="text-lg"><strong>Category:</strong> <span className="text-teal-700">{jobDetails.category}</span></p>
          <p className="text-lg"><strong>Description:</strong> <span className="text-teal-700">{jobDetails.description}</span></p>
          <p className="text-lg"><strong>Responsibilities:</strong> <span className="text-teal-700">{jobDetails.responsibilities}</span></p>
          <p className="text-lg"><strong>Requirements:</strong> <span className="text-teal-700">{jobDetails.requirements}</span></p>
        </div>

        {/* Application Information */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Application Information</h2>
          <p className="text-lg"><strong>Posted By:</strong> <span className="text-teal-700">{jobDetails.postedBy}</span></p>
          <p className="text-lg"><strong>Application Deadline:</strong> <span className="text-teal-700">{jobDetails.applicationDeadline}</span></p>
          <p className="text-lg"><strong>Date Posted:</strong> <span className="text-teal-700">{jobDetails.datePosted}</span></p>
        </div>

        {/* Apply Button */}
        <div className="flex justify-between items-center">
          <button className="bg-gradient-to-r from-teal-700 to-teal-600 text-white py-2 px-4 rounded-lg shadow hover:from-green-500 hover:to-teal-700 transition-colors duration-300">
            Apply Now
          </button>
        </div>
        
        {/* View Counter */}
        <div className="mt-4 flex items-center justify-center text-gray-600">
          <FaEye className="mr-2" /> {jobDetails.views} views
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
