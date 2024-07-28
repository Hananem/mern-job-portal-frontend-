import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({});
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const createEvent = async (formData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/events/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setEventData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    createEvent(formData);
  };

  return (
    <div className="container mx-auto max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <label htmlFor="title" className="block">
          Title:
          <input type="text" id="title" name="title" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="description" className="block">
          Description:
          <textarea id="description" name="description" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </label>

        <label htmlFor="date" className="block">
          Date:
          <input type="date" id="date" name="date" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="location" className="block">
          Location:
          <input type="text" id="location" name="location" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="companyName" className="block">
          Company Name:
          <input type="text" id="companyName" name="companyName" required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <label htmlFor="logo" className="block">
          Company Logo:
          <input type="file" id="logo" name="logo" accept="image/*" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </label>

        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Create Event</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {eventData._id && <p className="text-green-500">New event created with ID: {eventData._id}</p>}
    </div>
  );
};

export default CreateEvent;

