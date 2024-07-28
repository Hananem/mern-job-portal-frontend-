import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HireButton from "./HireButton"
import { useSelector, useDispatch } from 'react-redux';

const JobSeekerPosts = () => {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [username, setUsername] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [editPostId, setEditPostId] = useState(null);
  const [editPostData, setEditPostData] = useState({
    jobTitle: '',
    location: '',
    description: '',
    skills: '',
    experienceLevel: '',
    educationLevel: '',
  });
  const user = useSelector((state) => state.user?.user?.user);
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  console.log('Token:', token);
  const fetchFilteredPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/jobseeker/filter`, {
        params: {
          username,
          jobTitle,
          skills,
          location
        }
      });
      setPosts(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchAllPosts = async (pageNumber) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/jobseeker?page=${pageNumber}&pageSize=${pageSize}`);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    fetchAllPosts(pageNumber);
  };

  useEffect(() => {
    fetchAllPosts(page);
  }, [page]);

  const resetFilters = () => {
    setUsername('');
    setJobTitle('');
    setSkills('');
    setLocation('');
    fetchAllPosts(page);
  };

  const handleEdit = (post) => {
    setEditPostId(post._id);
    setEditPostData({
      jobTitle: post.jobTitle,
      location: post.location,
      description: post.description,
      skills: post.skills.join(', '),
      experienceLevel: post.experienceLevel,
      educationLevel: post.educationLevel,
    });
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:4000/api/jobseeker/${postId}`, {
        headers: {
          Authorization: token,
        },
      });
      fetchAllPosts(page);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/api/jobseeker/${editPostId}`, {
        ...editPostData,
        skills: editPostData.skills.split(',').map(skill => skill.trim()),
      }, {
        headers: {
          Authorization: token,
        },
      });
      setEditPostId(null);
      setEditPostData({
        jobTitle: '',
        location: '',
        description: '',
        skills: '',
        experienceLevel: '',
        educationLevel: '',
      });
      fetchAllPosts(page);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-4">
      {/* Filter Inputs */}
      <div className="mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Search by username"
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Search by job title"
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Search by skills (comma-separated)"
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by location"
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button onClick={fetchFilteredPosts} className="p-2 bg-blue-500 text-white rounded mr-2">
          Filter Posts
        </button>
        <button onClick={resetFilters} className="p-2 bg-red-500 text-white rounded">
          Reset Filters
        </button>
      </div>

      {/* Display Posts */}
      <ul>
        {posts.map(post => (
          <li key={post._id} className="mb-4 p-4 border border-gray-300 rounded">
            <h3 className="text-xl font-bold">{post.jobTitle}</h3>
            <p>{post.location}</p>
            <p>{post.user.username}</p>
            <p>{post.description}</p>
            <p>Skills: {post.skills.join(', ')}</p>
            <p>Experience Level: {post.experienceLevel}</p>
            <p>Education Level: {post.educationLevel}</p>
            <HireButton postId={post._id} hiredUserId={post.user._id} employerId={user?._id}/>
            <button
              onClick={() => handleEdit(post)}
              className="p-2 bg-yellow-500 text-white rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(post._id)}
              className="p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`p-2 border border-gray-300 rounded mr-2 ${page === index + 1 ? 'bg-gray-300' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Edit Modal */}
      {editPostId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h3 className="text-xl font-bold mb-4">Edit Post</h3>
            <input
              type="text"
              value={editPostData.jobTitle}
              onChange={(e) => setEditPostData({ ...editPostData, jobTitle: e.target.value })}
              placeholder="Job Title"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <input
              type="text"
              value={editPostData.location}
              onChange={(e) => setEditPostData({ ...editPostData, location: e.target.value })}
              placeholder="Location"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <textarea
              value={editPostData.description}
              onChange={(e) => setEditPostData({ ...editPostData, description: e.target.value })}
              placeholder="Description"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <input
              type="text"
              value={editPostData.skills}
              onChange={(e) => setEditPostData({ ...editPostData, skills: e.target.value })}
              placeholder="Skills (comma-separated)"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <input
              type="text"
              value={editPostData.experienceLevel}
              onChange={(e) => setEditPostData({ ...editPostData, experienceLevel: e.target.value })}
              placeholder="Experience Level"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <input
              type="text"
              value={editPostData.educationLevel}
              onChange={(e) => setEditPostData({ ...editPostData, educationLevel: e.target.value })}
              placeholder="Education Level"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <div className="flex justify-end">
              <button onClick={() => setEditPostId(null)} className="p-2 bg-gray-500 text-white rounded mr-2">
                Cancel
              </button>
              <button onClick={handleUpdate} className="p-2 bg-blue-500 text-white rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-2 bg-red-500 text-white rounded">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default JobSeekerPosts;


