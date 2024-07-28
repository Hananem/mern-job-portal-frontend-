
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEllipsisV } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { saveJob } from '../../redux/userSlice';
const AnotherJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.user?.user?.user?.savedJobs);
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: {
      name: '',
      description: '',
      contactEmail: '',
      logo: ''
    },
    location: '',
    salary: { min: '', max: '' },
    experienceLevel: '',
    employmentType: '',
    educationLevel: '',
    jobType: '',
    requirements: [],
    responsibilities: [],
  });
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    // Handle nested object updates
    if (name.startsWith('company.')) {
      const fieldName = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        company: {
          ...prevState.company,
          [fieldName]: value
        }
      }));
    } else if (name.startsWith('salary.')) {
      const fieldName = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        salary: {
          ...prevState.salary,
          [fieldName]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  const handleSaveJob = () => {
    dispatch(saveJob(jobId));
  };
  const handleUpdateJob = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:4000/api/jobs/${jobId}`, formData, {
        headers: {
          'Authorization': token
        }
      });
      setJob(response.data);
      setFormData(response.data);
      setLoading(false);
      setShowUpdateModal(false); // Close the modal after updating
    } catch (error) {
      console.error('Error updating job:', error);
      setLoading(false);
    }
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
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
      await axios.delete(`http://localhost:4000/api/jobs/${jobId}`, {
        headers: {
          'Authorization': token
        }
      });
      navigate('/jobs'); // Navigate to jobs list or homepage after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-500 hover:text-gray-800 mb-4"
      >
        &larr; Back
      </button>
      {job ? (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Job Details</h2>
            <button onClick={handleSaveJob} disabled={loading}>
  {savedJobs.includes(jobId) ? 'Saved' : 'Save'}
</button>
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="absolute right-0 top-0">
                <FaEllipsisV />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                  <button onClick={() => setShowUpdateModal(true)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</button>
                  <button onClick={() => setShowDeleteModal(true)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete</button>
                </div>
              )}
            </div>
            <p><strong>Job Title:</strong> {job.jobTitle}</p>
            <p><strong>Company Name:</strong> {job.company.name}</p>
            <p><strong>Company Description:</strong> {job.company.description}</p>
            <p><strong>Company Contact Email:</strong> {job.company.contactEmail}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary.min} - {job.salary.max}</p>
            <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
            <p><strong>Employment Type:</strong> {job.employmentType}</p>
            <p><strong>Education Level:</strong> {job.educationLevel}</p>
            <p><strong>Job Type:</strong> {job.jobType}</p>
            <p><strong>Requirements:</strong> {job.requirements.join(', ')}</p>
            <p><strong>Responsibilities:</strong> {job.responsibilities.join(', ')}</p>
          </div>
          {showUpdateModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full overflow-y-auto max-h-screen">
                <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle || ''}
                  onChange={handleInputChange}
                  className="border p-2 mb-4 w-full"
                  placeholder="Job Title"
                />
                <input
                  type="text"
                  name="company.name"
                  value={formData.company.name || ''}
                  onChange={handleInputChange}
                  className="border p-2 mb-4 w-full"
                  placeholder="Company Name"
                />
                <textarea
                  name="company.description"
                  value={formData.company.description || ''}
                  onChange={handleInputChange}
                  className="border p-2 mb-4 w-full"
                  placeholder="Company Description"
                />
                <input
                  type="email"
                  name="company.contactEmail"
                  value={formData.company.contactEmail || ''}
                  onChange={handleInputChange}
                  className="border p-2 mb-4 w-full"
                  placeholder="Company Contact Email"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleInputChange}
                  className="border p-2 mb-4 w-full"
                  placeholder="Location"
                />
                <input
                  type="number"
                  name="salary.min"
                  value={formData.salary.min || ''}
                  onChange={handleInputChange}
                  className="border p-2 mb-4 w-full"
                  placeholder="Min Salary"
                />
                <input
                  type="number"
                  name="salary.max"
                  value={formData.salary.max || ''}
                  onChange={handleInputChange}
                  className="border p-2 mb-4 w-full"
                  placeholder="Max Salary"
                />
                <input
                  type="text"
                  name="experienceLevel"
                  value={formData.experienceLevel || ''}
                  onChange={handleInputChange}
                  className="border p-2 mb-4 w-full"
                  placeholder="Experience Level"
                />
                <input
                  type="text"
                  name="employmentType"
                  value={formData.employmentType || ''}
                  onChange={handleInputChange}
                  className="border p-2 mb-4 w-full"
                  placeholder="Employment Type"
                />
                <input
                  type="text"
                  name="educationLevel"
                  value={formData.educationLevel || ''}
                  onChange={handleInputChange}
                  className="border p-2 mb-4 w-full"
                  placeholder="Education Level"
                />
                <input
                  type="text"
                  name="jobType"
                  value={formData.jobType || ''}
                  onChange={handleInputChange}
                  className="border p-2 mb-4 w-full"
                  placeholder="Job Type"
                />
                <textarea
                  name="requirements"
                  value={formData.requirements.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value.split(', ') })}
                  className="border p-2 mb-4 w-full"
                  placeholder="Requirements (comma separated)"
                />
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value.split(', ') })}
                  className="border p-2 mb-4 w-full"
                  placeholder="Responsibilities (comma separated)"
                />
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
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowUpdateModal(false)}
                    className="mr-4 px-4 py-2 text-gray-500 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateJob}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </div>
            </div>
          )}
          {showDeleteModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
                <p className="mb-8">Are you sure you want to delete this job?</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="mr-4 px-4 py-2 text-gray-500 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteJob}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
  );
};

export default AnotherJob;


