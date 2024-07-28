import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState('');

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
      setEditMode(false);
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
      {editMode ? (
        <>
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
        </>
      ) : (
        <>
          {blog.image && (
            <img
              src={blog.image.url}
              alt={blog.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
          )}
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
          <button onClick={() => setEditMode(true)} className="bg-yellow-500 text-white py-2 px-4 rounded mr-2">Edit Blog</button>
          <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded">Delete Blog</button>
        </>
      )}
      {message && <p className="text-green-500 mt-4">{message}</p>}
    </div>
  );
};

export default BlogDetails;



