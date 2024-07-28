import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobDetailsEditor = ({ jobId, initialJob, onUpdate }) => {
  const [job, setJob] = useState(initialJob);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setJob(initialJob);
  }, [initialJob]);

  const handleUpdateJobDetails = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;

      const response = await axios.put(`http://localhost:4000/api/jobs/${jobId}`, job, {
        headers: { Authorization: token }
      });

      onUpdate(response.data); // Notify parent component of update
    } catch (err) {
      console.error('Error updating job details:', err);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log('Selected file:', event.target.files[0]);
  };

  const handleUpdateLogo = async () => {
    if (!selectedFile) {
      alert('Please select an image.');
      return;
    }

    try {
      setUploadingImage(true);

      const formData = new FormData();
      formData.append('logo', selectedFile);

      const token = JSON.parse(localStorage.getItem('user'))?.token;

      const response = await axios.post(
        `http://localhost:4000/api/jobs/${jobId}/logo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        const updatedJob = response.data;
        setJob(prevJob => ({
          ...prevJob,
          company: {
            ...prevJob.company,
            logo: { ...prevJob.company.logo, url: updatedJob.company.logo.url }
          }
        }));
        setMessage('Job logo updated successfully');
      } else {
        throw new Error('Failed to update logo');
      }
    } catch (error) {
      console.error('Error updating logo:', error);
      setMessage('Failed to update job logo');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("company.")) {
      const companyField = name.split(".")[1];
      setJob({
        ...job,
        company: {
          ...job.company,
          [companyField]: value,
        },
      });
    } else if (name.startsWith("salary.")) {
      const salaryField = name.split(".")[1];
      setJob({
        ...job,
        salary: {
          ...job.salary,
          [salaryField]: value,
        },
      });
    } else {
      setJob({
        ...job,
        [name]: value,
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Update Job Details</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <div className="mb-4">
        <label htmlFor="jobTitle" className="block">
          Job Title:
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={job.jobTitle}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="companyName" className="block">
          Company Name:
          <input
            type="text"
            id="companyName"
            name="company.name"
            value={job.company.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="companyDescription" className="block">
          Company Description:
          <textarea
            id="companyDescription"
            name="company.description"
            value={job.company.description}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
            rows={4}
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block">
          Location:
          <input
            type="text"
            id="location"
            name="location"
            value={job.location}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="salary" className="block">
          Salary Range:
          <div className="flex">
            <input
              type="number"
              id="minSalary"
              name="salary.min"
              value={job.salary.min}
              onChange={handleChange}
              className="border border-gray-300 rounded-l px-3 py-2 mt-1 w-1/2"
            />
            <input
              type="number"
              id="maxSalary"
              name="salary.max"
              value={job.salary.max}
              onChange={handleChange}
              className="border border-gray-300 rounded-r px-3 py-2 mt-1 w-1/2"
            />
          </div>
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="experienceLevel" className="block">
          Experience Level:
          <input
            type="text"
            id="experienceLevel"
            name="experienceLevel"
            value={job.experienceLevel}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="employmentType" className="block">
          Employment Type:
          <input
            type="text"
            id="employmentType"
            name="employmentType"
            value={job.employmentType}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="educationLevel" className="block">
          Education Level:
          <input
            type="text"
            id="educationLevel"
            name="educationLevel"
            value={job.educationLevel}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="jobType" className="block">
          Job Type:
          <input
            type="text"
            id="jobType"
            name="jobType"
            value={job.jobType}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="requirements" className="block">
          Requirements (comma-separated):
          <input
            type="text"
            id="requirements"
            name="requirements"
            value={job.requirements.join(', ')}
            onChange={(e) =>
              setJob({ ...job, requirements: e.target.value.split(',').map(r => r.trim()) })
            }
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="responsibilities" className="block">
          Responsibilities (comma-separated):
          <input
            type="text"
            id="responsibilities"
            name="responsibilities"
            value={job.responsibilities.join(', ')}
            onChange={(e) =>
              setJob({ ...job, responsibilities: e.target.value.split(',').map(r => r.trim()) })
            }
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          Job Logo:
          <input
            type="file"
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png"
            className="mt-1"
          />
          <button
            onClick={handleUpdateLogo}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            disabled={uploadingImage}
          >
            {uploadingImage ? 'Uploading...' : 'Update Logo'}
          </button>
        </label>
      </div>
<button
     onClick={handleUpdateJobDetails}
     className="bg-green-500 text-white px-4 py-2 rounded mt-2"
   >
Update Job Details
</button>
</div>
);
};

export default JobDetailsEditor;

