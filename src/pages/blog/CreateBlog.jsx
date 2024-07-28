import React, { useState } from 'react';
import axios from 'axios';

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({});
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const createBlog = async (formData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/blogs/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setBlogData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    createBlog(formData);
  };

  return (
    <div className="container mx-auto max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <label htmlFor="title" className="block">
          Title:
          <input type="text" id="title" name="title" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="content" className="block">
          Content:
          <textarea id="content" name="content" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </label>

        <label htmlFor="image" className="block">
          Image:
          <input type="file" id="image" name="image" accept="image/*" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Create Blog</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {blogData._id && <p className="text-green-500">New blog created with ID: {blogData._id}</p>}
    </div>
  );
};

export default CreateBlog;
