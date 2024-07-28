import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); // Adjust as needed
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async (page) => {
    try {
      const response = await fetch(`http://localhost:4000/api/blogs?page=${page}&pageSize=${pageSize}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      setBlogs(data.blogs);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  return (
    <div className="container mx-auto max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li key={blog._id} className="border p-4 rounded-md shadow-sm">
            <Link to={`/blogs/${blog._id}`}>
              {blog.image && (
                <img
                  src={blog.image.url}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-xl font-semibold">{blog.title}</h2>
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
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogList;

