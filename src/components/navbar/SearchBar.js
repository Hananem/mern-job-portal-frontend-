import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ blogs: [], jobs: [], jobSeekerPosts: [], events: [], users: [] });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/api/search?query=${query}`);
      setResults(response.data);
    } catch (err) {
      console.error('Error fetching search results:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSearch} className="flex mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Search..."
        />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600">
          Search
        </button>
      </form>
      <div className="space-y-4">
        {results.blogs.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Blogs</h2>
            <ul className="space-y-2">
              {results.blogs.map((blog) => (
                <li key={blog._id} className="p-4 border border-gray-200 rounded-md">
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p>{blog.content}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {results.jobs.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Jobs</h2>
            <ul className="space-y-2">
              {results.jobs.map((job) => (
                <li key={job._id} className="p-4 border border-gray-200 rounded-md">
                  <h3 className="text-lg font-semibold">{job.jobTitle}</h3>
                  <p>{job.company.name}</p>
                  <p>{job.location}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {results.jobSeekerPosts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Job Seeker Posts</h2>
            <ul className="space-y-2">
              {results.jobSeekerPosts.map((post) => (
                <li key={post._id} className="p-4 border border-gray-200 rounded-md">
                  <h3 className="text-lg font-semibold">{post.jobTitle}</h3>
                  <p>{post.location}</p>
                  <p>{post.skills.join(', ')}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {results.events.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Events</h2>
            <ul className="space-y-2">
              {results.events.map((event) => (
                <li key={event._id} className="p-4 border border-gray-200 rounded-md">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p>{event.description}</p>
                  <p>{event.location}</p>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {results.users.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Users</h2>
            <ul className="space-y-2">
              {results.users.map((user) => (
                <li key={user._id} className="p-4 border border-gray-200 rounded-md">
                  <h3 className="text-lg font-semibold">{user.username}</h3>
                  <p>{user.email}</p>
                  <p>{user.location}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
