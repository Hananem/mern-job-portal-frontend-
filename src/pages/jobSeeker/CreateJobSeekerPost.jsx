import React, { useState } from 'react';

const CreateJobSeekerPost = () => {
  const [postData, setPostData] = useState({});
  const [error, setError] = useState(null);

  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const createJobSeekerPost = async (formData) => {
    try {
      const response = await fetch('http://localhost:4000/api/jobSeeker/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token, // No need to add 'Bearer' prefix if not used in backend
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create job seeker post');
      }
      const data = await response.json();
      setPostData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jobSeekerDetails = {
      jobTitle: formData.get('jobTitle'),
      location: formData.get('location'),
      description: formData.get('description'),
      skills: formData.get('skills').split(',').map(skill => skill.trim()),
      experienceLevel: formData.get('experienceLevel'),
      educationLevel: formData.get('educationLevel'),
    };
    createJobSeekerPost(jobSeekerDetails);
  };

  return (
    <div className="container mx-auto max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="jobTitle" className="block">
          Job Title:
          <input type="text" id="jobTitle" name="jobTitle" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="location" className="block">
          Location:
          <input type="text" id="location" name="location" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="description" className="block">
          Description:
          <textarea id="description" name="description" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </label>

        <label htmlFor="skills" className="block">
          Skills:
          <input type="text" id="skills" name="skills" placeholder="Comma separated values" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="experienceLevel" className="block">
          Experience Level:
          <input type="text" id="experienceLevel" name="experienceLevel" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="educationLevel" className="block">
          Education Level:
          <input type="text" id="educationLevel" name="educationLevel" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Create Job Seeker Post</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {postData._id && <p className="text-green-500">New post created with ID: {postData._id}</p>}
    </div>
  );
};

export default CreateJobSeekerPost;

