import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';
import { setUser } from '../../redux/userSlice';

const JobSeekerPostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); // Adjust as needed
  const [totalPages, setTotalPages] = useState(1);
  const [editingPost, setEditingPost] = useState(null); // To manage the post being edited
  const [updatedData, setUpdatedData] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(null); // To manage the dropdown state
  const [loading, setLoading] = useState(false); // Add loading state
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.user);
  const [isEmployer, setIsEmployer] = useState(() => {
    // Initialize from localStorage, default to false if not present
    return JSON.parse(localStorage.getItem('isEmployer')) || false;
  });

  useEffect(() => {
    // Save isEmployer to localStorage whenever it changes
    localStorage.setItem('isEmployer', JSON.stringify(isEmployer));
  }, [isEmployer]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  }, [dispatch]);

  const fetchPosts = async (pageNumber) => {
    try {
      const response = await fetch(`http://localhost:4000/api/jobseeker?page=${pageNumber}&pageSize=${pageSize}`);
      if (!response.ok) {
        throw new Error('Failed to fetch job seeker posts');
      }
      const data = await response.json();
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleUpdate = (post) => {
    setEditingPost(post);
    setUpdatedData({ ...post }); // Ensure all fields are copied
    setDropdownOpen(null); // Close the dropdown when editing
  };

  const handleSaveUpdate = async () => {
    setLoading(true); // Set loading to true while saving
    try {
      const response = await axios.put(
        `http://localhost:4000/api/jobseeker/${editingPost._id}`,
        updatedData,
        {
          headers: { Authorization: token },
        }
      );

      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
      );
      setEditingPost(null);
      alert('Post updated successfully');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post');
    } finally {
      setLoading(false); // Set loading to false after saving
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:4000/api/jobseeker/${postId}`, {
        headers: { Authorization: user.token },
      });

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      alert('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  const handleHire = async (jobSeekerPostId, hiredUserId, employerId) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/jobseeker/hire`,
        {
          jobSeekerPostId,
          hiredUserId,
          employerId,
        },
        {
          headers: { Authorization: token },
        }
      );

      setIsEmployer(response?.data?.jobHiring?.employer === user._id);
      alert('User hired/unhired successfully');
    } catch (error) {
      console.error('Error hiring user:', error);
      alert('Error hiring user');
    }
  };

  const renderHireButton = (post) => {
    if (isEmployer) {
      return 'Unhire'; // Display "Unhire" if user is the employer
    } else {
      return 'Hire'; // Display "Hire" otherwise
    }
  };

  const toggleDropdown = (postId) => {
    setDropdownOpen(dropdownOpen === postId ? null : postId);
  };

  return (
    <div className="container mx-auto px-[2%] md:px-[6%]">
      <h1 className="text-2xl font-bold mb-4 text-center">Job Seeker Posts</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {posts.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {posts.map((post) => (
            <div key={post._id} className="card border border-green-500 group flex-1 basis-[25rem] p-4">
              <div className="flex flex-col items-center mb-4">
                {post.user.profilePhoto && post.user.profilePhoto.url && (
                  <div className="flex items-center justify-center flex-col">
                    <img src={post.user.profilePhoto.url} alt="Profile" className="w-16 h-16 rounded-full mb-2" />
                    <p className="text-sm text-gray-600 text-center">{post.user.username}</p>
                    <h2 className="text-lg font-semibold text-center">{post.jobTitle}</h2>
                  </div>
                )}
              </div>
              <p className="text-center">{post.description}</p>
              {post.skills && (
                <div className="mt-2">
                  <div className="flex flex-wrap items-center justify-center mt-1">
                    {post.skills.map((skill, index) => (
                      <span key={index} className="text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 mb-2">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-sm text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</p>
              <div className="flex justify-center mt-4 relative">
                {post.user._id === user._id && (
                  <>
                    <FaEllipsisV
                      className="cursor-pointer"
                      onClick={() => toggleDropdown(post._id)}
                    />
                    {dropdownOpen === post._id && (
                      <div className="absolute top-8 right-0 bg-white shadow-md rounded-md z-10">
                        <button
                          onClick={() => handleUpdate(post)}
                          className="block px-4 py-2 text-left hover:bg-gray-200 w-full"
                        >
                          <FaEdit className="inline mr-2" />
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="block px-4 py-2 text-left hover:bg-gray-200 w-full"
                        >
                          <FaTrash className="inline mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
                <button
                  onClick={() => handleHire(post._id, post.user._id, user._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  {renderHireButton(post)}
                </button>
              </div>
              {editingPost && editingPost._id === post._id && (
                <div className="mt-4">
                  <input
                    type="text"
                    value={updatedData.jobTitle || ''}
                    onChange={(e) => setUpdatedData({ ...updatedData, jobTitle: e.target.value })}
                    className="border p-2 w-full"
                    placeholder="Job Title"
                  />
                  <input
                    type="text"
                    value={updatedData.location || ''}
                    onChange={(e) => setUpdatedData({ ...updatedData, location: e.target.value })}
                    className="border p-2 w-full mt-2"
                    placeholder="Location"
                  />
                  <textarea
                    value={updatedData.description || ''}
                    onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
                    className="border p-2 w-full mt-2"
                    placeholder="Description"
                  />
                  <button
                    onClick={handleSaveUpdate}
                    className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
          ))}
          {/* Pagination controls can be added here if needed */}
        </div>
      ) : (
        <p className="text-center">No posts found.</p>
      )}
    </div>
  );
};

export default JobSeekerPostList;



