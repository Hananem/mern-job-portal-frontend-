import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [logo, setLogo] = useState(null);
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/jobs/${jobId}`);
        setJob(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleUpdateJob = async () => {
    const updatedData = { ...formData };
    delete updatedData.views; // Exclude views field

    try {
      const response = await axios.put(`http://localhost:4000/api/jobs/${jobId}`, updatedData, {
        headers: { Authorization: token }
      });
      setJob(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleUploadLogo = async () => {
    const logoData = new FormData();
    logoData.append('logo', logo);

    try {
      const response = await axios.post(`http://localhost:4000/api/jobs/${jobId}/logo`, logoData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
      });
      setJob(response.data);
    } catch (error) {
      console.error('Error uploading logo:', error);
    }
  };

  const handleDeleteJob = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/jobs/${jobId}`);
      navigate('/jobs'); // Redirect to jobs list after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {job && (
        <div>
          <h1 className="text-2xl font-bold mb-4">{job.jobTitle}</h1>
          {isEditing ? (
            <div>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle || ''}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full"
              />
              <input
                type="text"
                name="company.name"
                value={formData.company?.name || ''}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full"
              />
              <textarea
                name="company.description"
                value={formData.company?.description || ''}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full"
              />
              <input
                type="email"
                name="company.contactEmail"
                value={formData.company?.contactEmail || ''}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full"
              />
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full"
              />
              <input
                type="number"
                name="salary.min"
                value={formData.salary?.min || ''}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full"
              />
              <input
                type="number"
                name="salary.max"
                value={formData.salary?.max || ''}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full"
              />
              <input
                type="text"
                name="experienceLevel"
                value={formData.experienceLevel || ''}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full"
              />
              <input
                type="text"
                name="employmentType"
                value={formData.employmentType || ''}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full"
              />
              <input
                type="text"
                name="educationLevel"
                value={formData.educationLevel || ''}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full"
              />
              <input
                type="text"
                name="jobType"
                value={formData.jobType || ''}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full"
              />
              <textarea
                name="requirements"
                value={formData.requirements.join(', ') || ''}
                onChange={(e) =>
                  setFormData({ ...formData, requirements: e.target.value.split(', ') })
                }
                className="border p-2 mb-4 w-full"
              />
              <textarea
                name="responsibilities"
                value={formData.responsibilities.join(', ') || ''}
                onChange={(e) =>
                  setFormData({ ...formData, responsibilities: e.target.value.split(', ') })
                }
                className="border p-2 mb-4 w-full"
              />
              <button
                onClick={handleUpdateJob}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p>{job.company.name}</p>
              <p>{job.company.description}</p>
              <p>{job.company.contactEmail}</p>
              <p>{job.location}</p>
              <p>{job.salary.min} - {job.salary.max}</p>
              <p>{job.experienceLevel}</p>
              <p>{job.employmentType}</p>
              <p>{job.educationLevel}</p>
              <p>{job.jobType}</p>
              <p>{job.requirements.join(', ')}</p>
              <p>{job.responsibilities.join(', ')}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            </div>
          )}
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Company Logo</h2>
            {job.company.logo && (
              <img src={job.company.logo.url} alt="Company Logo" className="mb-4" />
            )}
            <input type="file" onChange={handleLogoChange} className="mb-4" />
            <button
              onClick={handleUploadLogo}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Upload Logo
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={handleDeleteJob}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete Job
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
