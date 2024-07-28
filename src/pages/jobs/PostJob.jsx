import React, { useState } from 'react';
import axios from 'axios';

const PostJob = () => {
  const [jobData, setJobData] = useState({});
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const postJob = async (formData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/jobs/postJob', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setJobData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    postJob(formData);
  };

  return (
    <div className="container mx-auto max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="jobTitle" className="block">
          Job Title:
          <input type="text" id="jobTitle" name="jobTitle" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="companyName" className="block">
          Company Name:
          <input type="text" id="companyName" name="companyName" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="companyDescription" className="block">
          Company Description:
          <textarea id="companyDescription" name="companyDescription" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </label>

        <label htmlFor="companyContactEmail" className="block">
          Company Contact Email:
          <input type="email" id="companyContactEmail" name="companyContactEmail" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="companyLocation" className="block">
          Company Location:
          <input type="text" id="companyLocation" name="companyLocation" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="jobLocation" className="block">
          Job Location:
          <input type="text" id="jobLocation" name="jobLocation" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="minSalary" className="block">
          Minimum Salary:
          <input type="number" id="minSalary" name="minSalary" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="maxSalary" className="block">
          Maximum Salary:
          <input type="number" id="maxSalary" name="maxSalary" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="experienceLevel" className="block">
          Experience Level:
          <input type="text" id="experienceLevel" name="experienceLevel" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="employmentType" className="block">
          Employment Type:
          <input type="text" id="employmentType" name="employmentType" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="educationLevel" className="block">
          Education Level:
          <input type="text" id="educationLevel" name="educationLevel" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="jobType" className="block">
          Job Type:
          <input type="text" id="jobType" name="jobType" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="requirements" className="block">
          Requirements:
          <input type="text" id="requirements" name="requirements" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="responsibilities" className="block">
          Responsibilities:
          <input type="text" id="responsibilities" name="responsibilities" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="logo" className="block">
          Company Logo:
          <input type="file" id="logo" name="logo" accept="image/*" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Create Job</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {jobData._id && <p className="text-green-500">New job created with ID: {jobData._id}</p>}
    </div>
  );
};

export default PostJob;
