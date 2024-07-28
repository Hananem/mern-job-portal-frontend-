import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { markInterested } from '../../redux/userSlice';
import { FaEllipsisVertical } from 'react-icons/fa6';
import EventFilter from "./EventFilter"
const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedEvent, setUpdatedEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });
  const [logo, setLogo] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.user?.user?._id);
  const token = useSelector((state) => state.user?.user?.token);
  const interestedEvents = useSelector((state) => state.user?.user?.user?.interestedEvents);

  // Fetch events from the API
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/events');
      if (!response.data) {
        throw new Error('Failed to fetch events');
      }
      setEvents(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle logo file change
const handleLogoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setLogo(file);
  }
};

  // Upload logo to the server
const handleUploadLogo = async (eventId) => {
  if (!logo) {
    console.error('No logo file selected');
    return;
  }

  const logoData = new FormData();
  logoData.append('logo', logo);

  try {
    const response = await axios.post(`http://localhost:4000/api/events/${eventId}/logo`, logoData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    });

    if (response.data && response.data.logo) {
      // Update the events state with the new logo
      setEvents(events.map(event =>
        event._id === eventId ? { ...event, company: { ...event.company, logo: response.data.logo } } : event
      ));

      // Update the currentEvent state with the new logo
      if (currentEvent && currentEvent._id === eventId) {
        setCurrentEvent(prevEvent => ({
          ...prevEvent,
          company: { ...prevEvent.company, logo: response.data.logo },
        }));
      }

      console.log('Logo uploaded successfully:', response.data.logo);
    }
  } catch (error) {
    console.error('Error uploading logo:', error);
  }
};



  const handleUpdate = async (eventId) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/events/${eventId}`,
        updatedEvent,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.data) {
        throw new Error('Failed to update event');
      }

      setEvents(events.map(event =>
        event._id === eventId ? response.data.event : event
      ));

      setShowUpdateModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/events/${eventId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        setEvents(events.filter(event => event._id !== eventId));
        setShowDeleteModal(false);
      } else {
        throw new Error('Failed to delete event');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleEditMode = (event) => {
    const formattedDate = event.date.split('T')[0];
    setUpdatedEvent({
      title: event.title,
      description: event.description,
      date: formattedDate,
      location: event.location,
    });
    setCurrentEvent(event);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (event) => {
    setCurrentEvent(event);
    setShowDeleteModal(true);
  };

  const handleUpdateSubmit = () => {
    handleUpdate(currentEvent._id);
  };

  const handleDeleteSubmit = () => {
    handleDelete(currentEvent._id);
  };

  const handleMarkAsInterested = async (eventId) => {
    try {
      await dispatch(markInterested(eventId)).unwrap();
    } catch (error) {
      console.error('Error marking event as interested:', error);
      setError(error.message);
    }
  };

  const isInterested = (eventId) => interestedEvents?.includes(eventId);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto max-w-lg">
    <EventFilter/>
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <ul className="space-y-4">
        {events.map(event => (
          <li key={event._id} className="border p-4 card flex-1 basis-[18rem] relative">
            <h3 className="text-lg font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <p>{event.location}</p>
            {event.company.logo && (
              <div className="flex items-center mt-2">
                <img
                  src={event.company.logo.url}
                  alt={`${event.company.name} logo`}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <p>{event.company.name}</p>
              </div>
            )}
            <DropdownMenu onEdit={() => toggleEditMode(event)} onDelete={() => handleDeleteClick(event)} />
            <button
              onClick={() => handleMarkAsInterested(event._id)}
              className={`py-2 px-4 rounded ml-2 ${isInterested(event._id) ? 'bg-gray-500' : 'bg-green-500'} text-white`}
            >
              {isInterested(event._id) ? 'Not Interested' : 'Interested'}
            </button>
          </li>
        ))}
      </ul>

    {showUpdateModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded max-w-md w-full h-3/4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Update Event</h2>
      <input
        type="text"
        name="title"
        value={updatedEvent.title || ""}
        onChange={(e) => setUpdatedEvent(prevState => ({ ...prevState, title: e.target.value }))}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <textarea
        name="description"
        value={updatedEvent.description || ""}
        onChange={(e) => setUpdatedEvent(prevState => ({ ...prevState, description: e.target.value }))}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <input
        type="date"
        name="date"
        value={updatedEvent.date || ""}
        onChange={(e) => setUpdatedEvent(prevState => ({ ...prevState, date: e.target.value }))}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="location"
        value={updatedEvent.location || ""}
        onChange={(e) => setUpdatedEvent(prevState => ({ ...prevState, location: e.target.value }))}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Company Logo</h2>
        {currentEvent?.company?.logo && (
          <img src={currentEvent.company.logo.url} alt="Company Logo" className="mb-4" />
        )}
        <input type="file" onChange={handleLogoChange} className="mb-4" />
        <button
          onClick={() => handleUploadLogo(currentEvent._id)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Upload Logo
        </button>
      </div>

      <button
        onClick={handleUpdateSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update
      </button>
      <button
        onClick={() => setShowUpdateModal(false)}
        className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
      >
        Cancel
      </button>
    </div>
  </div>
)}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded max-w-md w-full">
            <h2 className="text-xl mb-4">Are you sure you want to delete this event?</h2>
            <button
              onClick={handleDeleteSubmit}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const DropdownMenu = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute top-2 right-2">
      <div className="dropdown inline-block relative">
        <button className="text-gray-700 py-2 px-4 rounded inline-flex items-center" onClick={toggleDropdown}>
          <FaEllipsisVertical />
        </button>
        {isOpen && (
          <ul className="dropdown-menu absolute bg-white text-gray-700 pt-1 right-0 w-32">
            <li>
              <button onClick={onEdit} className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap w-full text-left">
                Edit
              </button>
            </li>
            <li>
              <button onClick={onDelete} className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap w-full text-left">
                Delete
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Events;



