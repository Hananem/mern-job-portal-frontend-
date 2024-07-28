import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch  } from 'react-redux';
import { markInterested } from '../../redux/userSlice';
const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updatedEvent, setUpdatedEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });
  const [image, setImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
 const userId = useSelector((state) => state.user?.user?.user?._id);
 const token = useSelector((state) => state.user?.user?.token);
 const interestedEvents = useSelector((state) => state.user?.user?.user?.interestedEvents);
 
  useEffect(() => {
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

    fetchEvents();
  }, []);

  const handleUpdate = async (eventId) => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;

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

      // Update the local events state with the updated event
      setEvents(events.map(event =>
        event._id === eventId ? response.data.event : event
      ));

      setEditMode(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpdate = async (eventId) => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      setUploadingImage(true);

      const token = JSON.parse(localStorage.getItem('user'))?.token;

      const response = await axios.post(
        `http://localhost:4000/api/events/${eventId}/upload-logo`,
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (!response.data) {
        throw new Error('Failed to upload logo');
      }

      // Update the local events state with the updated logo
      setEvents(events.map(event =>
        event._id === eventId ? { ...event, company: { ...event.company, logo: response.data.logo } } : event
      ));

      setUploadingImage(false);
    } catch (error) {
      console.error('Error updating logo:', error);
      setUploadingImage(false);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;

      const response = await axios.delete(`http://localhost:4000/api/events/${eventId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        // Remove the deleted event from the local state
        setEvents(events.filter(event => event._id !== eventId));
      } else {
        throw new Error('Failed to delete event');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleEditMode = (eventId) => {
    const eventToUpdate = events.find(event => event._id === eventId);
    setUpdatedEvent({
      title: eventToUpdate.title,
      description: eventToUpdate.description,
      date: eventToUpdate.date,
      location: eventToUpdate.location,
    });
    setEditMode(true);
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
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <ul className="space-y-4">
        {events.map(event => (
          <li key={event._id} className="border p-4 card flex-1 basis-[18rem]">
            {editMode && updatedEvent._id === event._id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={updatedEvent.title}
                  onChange={(e) => setUpdatedEvent(prevState => ({ ...prevState, title: e.target.value }))}
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <textarea
                  name="description"
                  value={updatedEvent.description}
                  onChange={(e) => setUpdatedEvent(prevState => ({ ...prevState, description: e.target.value }))}
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                  type="date"
                  name="date"
                  value={updatedEvent.date}
                  onChange={(e) => setUpdatedEvent(prevState => ({ ...prevState, date: e.target.value }))}
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="location"
                  value={updatedEvent.location}
                  onChange={(e) => setUpdatedEvent(prevState => ({ ...prevState, location: e.target.value }))}
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept=".jpg,.jpeg,.png"
                  className="mb-2"
                />
                <button
                  onClick={() => handleImageUpdate(event._id)}
                  className="bg-green-500 text-white py-2 px-4 rounded"
                  disabled={uploadingImage}
                >
                  {uploadingImage ? 'Uploading...' : 'Update Logo'}
                </button>
                <button
                  onClick={() => handleUpdate(event._id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                >
                  Update Event
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h1 className="text-lg font-bold">{event.title}</h1>
                <p>{event.description}</p>
                <p className="text-sm">{new Date(event.date).toLocaleDateString()}</p>
                <p className="opacity-60 text-sm text-primary">{event.location}</p>
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
                <div className="mt-2">
                  <button onClick={() => toggleEditMode(event._id)} className="bg-yellow-500 text-white py-2 px-4 rounded">
                    Edit Event
                  </button>
                  <button onClick={() => handleDelete(event._id)} className="bg-red-500 text-white py-2 px-4 rounded ml-2">
                    Delete Event
                  </button>
                  <button
                onClick={() => handleMarkAsInterested(event._id)}
                className={`py-2 px-4 rounded ml-2 ${isInterested(event._id) ? 'bg-gray-500' : 'bg-green-500'} text-white`}
              >
                {isInterested(event._id) ? 'Not Interested' : 'Interested'}
              </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;


