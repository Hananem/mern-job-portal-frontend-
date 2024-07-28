import React from 'react';
import { Link } from 'react-router-dom';
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { FaSearch, FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaUser } from 'react-icons/fa';
const JobListings = ({ jobs }) => {
    return (
        <div>
            {jobs.length === 0 ? (
                <p>No jobs found</p>
            ) : (
                jobs.map((job) => (
                    <div key={job._id} className="card border border-green-500 p-4  mb-6">
                        <div className="flex items-center mb-4">
                            <img
                                src={job.company.logo.url}
                                alt={`${job.company.name} logo`}
                                className="w-12 h-12 mr-4"
                            />
                            <div>
                                <Link to={`/jobs/${job._id}`}>
                                    <h2 className="text-lg font-bold text-gray-800">{job.jobTitle}</h2>
                                    <p className="text-gray-600">{job.company.name}</p>
                                </Link>
                            </div>
                         
                        </div>
                       <div className="flex-align-center mb-4">
                            <span className="text-sm text-muted bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 mb-2 flex items-center">
                                <FaBriefcase className="mr-1" /> {job.employmentType}
                            </span>
                            <span className="text-sm text-muted bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 mb-2 flex items-center">
                                <FaUser className="mr-1" /> {job.experienceLevel}
                            </span>
                             <span className="text-sm text-muted bg-gray-200 text-gray-800 px-2 py-1 rounded-full flex items-center">
                                <FaMapMarkerAlt className="mr-1" /> {job.location}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-2">{job.company.description}</p>
                       
                        <p className="text-sm text-gray-500 mb-2">
                            <strong>Education Level:</strong> {job.educationLevel}
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                            <strong>Job Type:</strong> {job.jobType}
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                            <strong>Contact:</strong> {job.company.contactEmail}
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                            <strong>Views:</strong> {job.views}
                        </p>
                        {job.salary && (
                            <div className="w-fit bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded mt-4 flex items-center">
                                <LiaMoneyBillWaveSolid className="mr-2" /> 
                                <span>
                                    ${job.salary.min} - ${job.salary.max} /month
                                </span>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};
export default JobListings;
