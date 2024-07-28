import React, { useState } from 'react';
import axios from 'axios';

const ApplyJobModal = ({ jobId, showModal, closeModal }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setResume(e.target.files[0]);
  };

  const applyForJob = async () => {
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('coverLetter', coverLetter);

    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;

      const response = await axios.post(
        `http://localhost:4000/api/jobs/${jobId}/apply`,
        formData,
        {
          headers: { 
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setSavedMessage(response.data.message);
      setTimeout(() => {
        setSavedMessage('');
        closeModal(); // Close modal after successful application
      }, 3000);
    } catch (err) {
      if (err.response && err.response.data) {
        setSavedMessage(err.response.data.message);
      } else {
        setSavedMessage('Failed to apply for job');
      }
      setTimeout(() => {
        setSavedMessage('');
      }, 3000);
    }
  };

  return (
    <div className={`modal ${showModal ? 'block' : 'hidden'} fixed z-50 inset-0 overflow-y-auto`}>
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20">
        <span className="close text-red-500 cursor-pointer float-right" onClick={closeModal}>&times;</span>
        <h2 className="text-2xl mb-4">Apply for Job</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          applyForJob();
        }}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Resume (PDF):</label>
            <input
              type="file"
              name="resume"
              onChange={handleFileChange}
              accept=".pdf"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Cover Letter:</label>
            <textarea
              name="coverLetter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit Application</button>
        </form>
        {savedMessage && <p className="mt-4">{savedMessage}</p>}
      </div>
    </div>
  );
};

export default ApplyJobModal;




