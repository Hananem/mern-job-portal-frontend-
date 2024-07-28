import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import ApplyJobModal from './ApplyJobModal';
import JobDetailsEditor from "./JobDetailsEditor"
import LogoUploadForm from "./LogoUploadForm"

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [savedMessage, setSavedMessage] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Define selectedFile
  const [uploading, setUploading] = useState(false); // Optional: Track uploading state

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/jobs/${jobId}`);
        setJob(response.data);
        setIsSaved(response.data.isSaved);
      } catch (err) {
        console.error('Error fetching job details:', err);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleLogoUploadSuccess = (updatedJob) => {
    setJob(updatedJob);
  };
  const handleSaveJob = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;

      const response = await axios.post(`http://localhost:4000/api/jobs/${jobId}/save`, {}, {
        headers: { Authorization: token }
      });

      setIsSaved(response.data.isSaved);
      setSavedMessage(response.data.message);
      setTimeout(() => {
        setSavedMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error saving job:', err);
      setSavedMessage('Failed to save job');
      setTimeout(() => {
        setSavedMessage('');
      }, 3000);
    }
  };

  const handleApplyJob = () => {
    setShowApplyModal(true);
  };

  const closeApplyModal = () => {
    setShowApplyModal(false);
  };
  const handleUpdate = (updatedJob) => {
    setJob(updatedJob);
  };



 

  if (!job) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{job.jobTitle}</h1>
      <p className="mb-4">{job.company.description}</p>
      <button onClick={handleSaveJob} className="mr-4">
        {isSaved ? <FaBookmark className="text-xl text-blue-500" /> : <FaRegBookmark className="text-xl" />}
      </button>
      <button
        onClick={handleApplyJob}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Apply for Job
      </button>
      {savedMessage && <p className="mt-4 text-green-500">{savedMessage}</p>}

      <ApplyJobModal
        jobId={jobId}
        showModal={showApplyModal}
        closeModal={closeApplyModal}
      />

<LogoUploadForm jobId={jobId} onSuccess={handleLogoUploadSuccess} />
      <JobDetailsEditor jobId={jobId} initialJob={job} onUpdate={handleUpdate} />
   

      {/* Display job details */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Job Details</h2>
        <p><strong>Company:</strong> {job.company.name}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Salary:</strong> ${job.salary.min} - ${job.salary.max}</p>
        <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
        <p><strong>Employment Type:</strong> {job.employmentType}</p>
        <p><strong>Education Level:</strong> {job.educationLevel}</p>
        <p><strong>Job Type:</strong> {job.jobType}</p>
        <p><strong>Requirements:</strong> {job.requirements.join(', ')}</p>
        <p><strong>Responsibilities:</strong> {job.responsibilities.join(', ')}</p>
        {job.company.logo && (
          <div className="mt-4">
            <img
              src={job.company.logo.url}
              alt={`${job.company.name} logo`}
              className="w-24 h-24 object-contain"
            />
          </div>
        )}

       
      </div>
    </div>
  );
};

export default JobDetails;







