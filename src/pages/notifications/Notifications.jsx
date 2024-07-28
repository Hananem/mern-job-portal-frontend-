// components/Notifications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/notifications', {
        headers: {
          Authorization: token // Include token in the headers
        }
      });
      const { notifications, unreadCount } = response.data;
      setNotifications(notifications);
      setUnreadCount(unreadCount);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async () => {
    try {
      await axios.put('http://localhost:4000/api/notifications/mark-read', {}, {
        headers: {
          Authorization: token // Include token in the headers
        }
      });
      setUnreadCount(0); // Reset unread count after marking as read
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">Unread Notifications: {unreadCount}</p>
        <button onClick={markAsRead} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Mark All as Read
        </button>
      </div>
      <ul>
        {notifications.map(notification => (
          <li key={notification._id} className="border-b py-4">
            <p className="text-gray-800">{notification.message}</p>
            <p className="text-sm text-gray-600">
              From: {notification.fromUser.username}, Regarding: {notification.job ? notification.job.jobTitle : 'Job Seeker Post'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
