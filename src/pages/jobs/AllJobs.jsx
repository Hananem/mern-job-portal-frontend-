import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [jobViews, setJobViews] = useState({});
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  useEffect(() => {
    fetchJobs(currentPage, 10);
  }, [currentPage]);

  const fetchJobs = async (page, limit) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/jobs/all?page=${page}&limit=${limit}`);
      const { jobs, totalPages, currentPage } = response.data;
      setJobs(jobs);
      setTotalPages(totalPages);
      setCurrentPage(currentPage);
      setLoading(false);
    } catch (error) {
      setError('Error fetching jobs');
      setLoading(false);
    }
  };

  const saveJob = async (jobId) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/jobs/${jobId}/save`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        const jobIndex = jobs.findIndex(job => job._id === jobId);
        if (jobIndex > -1) {
          const updatedJobs = [...jobs];
          updatedJobs[jobIndex] = {
            ...jobs[jobIndex],
            isSaved: true,
          };
          setJobs(updatedJobs);
        }
        setSavedMessage('Job saved successfully');
      } else {
        setSavedMessage('Failed to save job');
      }
    } catch (error) {
      console.error('Error saving job:', error);
      setSavedMessage('Failed to save job');
    } finally {
      setTimeout(() => {
        setSavedMessage('');
      }, 3000);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Job Listings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white shadow-md rounded-lg p-6 mb-6">
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
                  <button
                    onClick={() => saveJob(job._id)}
                    className="ml-auto text-gray-500 hover:text-gray-700"
                  >
                    {job.isSaved ? (
                      <FaBookmark className="text-xl text-blue-500" />
                    ) : (
                      <FaRegBookmark className="text-xl" />
                    )}
                  </button>
                </div>
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 text-blue-700 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                    {job.employmentType}
                  </span>
                  <span className="bg-yellow-100 text-yellow-700 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                    {job.experienceLevel}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{job.company.description}</p>
               
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Location:</strong> {job.location}
                </p>
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
                  <div className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded mt-4">
                    <strong>Salary:</strong> ${job.salary.min} - ${job.salary.max} /month
                  </div>
                )}
              </div>
            ))}
          </div>
          {savedMessage && <p className="text-green-500">{savedMessage}</p>}
          <div className="mt-5">
            {currentPage > 1 && (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous Page
              </button>
            )}
            {currentPage < totalPages && (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next Page
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllJobs;





