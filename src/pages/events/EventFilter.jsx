// components/EventFilter.js

// components/EventFilter.js

import React, { useState } from 'react';
import axios from 'axios';

import React, { useState } from 'react';

const EventFilter = ({ setFilteredEvents }) => {
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  
  const handleSearch = () => {
    // Call the function to filter events based on the provided criteria
    setFilteredEvents((events) => {
      return events.filter((event) => {
        const matchesTitle = event.title.toLowerCase().includes(title.toLowerCase());
        const matchesCompany = event.company.name.toLowerCase().includes(companyName.toLowerCase());
        const matchesLocation = event.location.toLowerCase().includes(location.toLowerCase());
        const matchesDate = date ? new Date(event.date).toISOString().split('T')[0] === date : true;

        return matchesTitle && matchesCompany && matchesLocation && matchesDate;
      });
    });
  };

  return (
    <div className="p-4 border-b">
      <h2 className="text-xl font-bold mb-2">Filter Events</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Search by company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Search by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSearch}
          className="py-2 px-4 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default EventFilter;


