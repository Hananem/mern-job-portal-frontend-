import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfilePhotoUpload from './ProfilePhotoUpload';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, [userId]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <ProfilePhotoUpload user={user} />
      <div className="flex items-center mb-4">
        <div>
          <p className="text-lg font-semibold">{user.username}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      {/* Add other user details as needed */}
    </div>
  );
};

export default Profile;
