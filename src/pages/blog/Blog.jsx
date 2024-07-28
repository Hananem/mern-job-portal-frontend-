import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { useParams, useNavigate } from 'react-router-dom';
import { FaEllipsisV } from 'react-icons/fa';

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/blogs/${id}`);
        if (!response.data) {
          throw new Error('Blog not found');
        }
        const data = response.data;
        setBlog(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;

      const response = await axios.put(`http://localhost:4000/api/blogs/${id}`, { title, content }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
      });

      if (!response.data) {
        throw new Error('Failed to update blog');
      }

      const updatedBlog = response.data;
      setBlog(updatedBlog);
      setShowUpdateModal(false);
      setMessage('Blog updated successfully');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;

      const response = await axios.delete(`http://localhost:4000/api/blogs/${id}`, {
        headers: {
          Authorization: token
        },
      });

      if (!response.data) {
        throw new Error('Failed to delete blog');
      }

      setMessage('Blog deleted successfully');
      setTimeout(() => {
        setMessage('');
        navigate('/blogs'); // Redirect to blogs page after deletion
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      setUploadingImage(true);

      const token = JSON.parse(localStorage.getItem('user'))?.token;

      const response = await axios.post(`http://localhost:4000/api/blogs/${id}/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token
        },
      });

      if (!response.data) {
        throw new Error('Failed to upload image');
      }

      const updatedImage = response.data.image;
      setBlog({ ...blog, image: updatedImage }); // Update the local blog state with the new image
      setUploadingImage(false);
      setMessage('Blog image updated successfully');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error updating image:', error);
      setUploadingImage(false);
      setMessage('Failed to update blog image');
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!blog) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="container mx-auto max-w-lg">
      {blog.image && (
        <img
          src={blog.image.url}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
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
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p>{blog.content}</p>
      {blog.author && (
        <div className="flex items-center mt-4">
          {blog.author.profileImage && (
            <img
              src={blog.author.profileImage}
              alt={`${blog.author.username}'s Profile`}
              className="h-10 w-10 rounded-full mr-2"
            />
          )}
          <p className="text-sm text-gray-600">Published by {blog.author.username}</p>
        </div>
      )}
      <p className="text-sm text-gray-600">{new Date(blog.createdAt).toLocaleDateString()}</p>
      {message && <p className="text-green-500 mt-4">{message}</p>}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Blog</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            {blog.image && (
              <img
                src={blog.image.url}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            )}
            <input
              type="file"
              onChange={handleImageChange}
              accept=".jpg,.jpeg,.png"
              className="mb-2"
            />
            <button onClick={handleImageUpdate} className="bg-green-500 text-white py-2 px-4 rounded" disabled={uploadingImage}>
            {uploadingImage ? 'Uploading...' : 'Update Image'}
          </button>
            <button onClick={handleUpdate} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">Update Blog</button>
            <button onClick={() => setShowUpdateModal(false)} className="bg-gray-500 text-white py-2 px-4 rounded mt-2 ml-2">Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Delete Blog</h2>
            <p>Are you sure you want to delete this blog?</p>
            <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded mt-4">Yes, Delete</button>
            <button onClick={() => setShowDeleteModal(false)} className="bg-gray-500 text-white py-2 px-4 rounded mt-4 ml-2">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;

