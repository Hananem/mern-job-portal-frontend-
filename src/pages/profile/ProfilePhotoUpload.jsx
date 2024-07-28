import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';

const ProfilePhotoUpload = ({ user }) => {
  const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto?.url || '');
  const [error, setError] = useState(null);

  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await fetch('http://localhost:4000/api/users/profile/photo', {
        method: 'POST',
        headers: {
          'Authorization': token,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      setProfilePhoto(data.profilePhoto.url);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="profile-photo-upload relative w-20 h-20">
      {error && <div className="text-red-500">{error}</div>}
      <div className="relative w-20 h-20">
        {profilePhoto ? (
          <img src={profilePhoto} alt="Profile" className="rounded-full h-full w-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-300 rounded-full">
            <FaCamera size={30} />
          </div>
        )}
        <label className="absolute bottom-0 right-0 p-1 bg-gray-800 bg-opacity-75 rounded-full cursor-pointer">
          <FaCamera size={20} className="text-white" />
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;





