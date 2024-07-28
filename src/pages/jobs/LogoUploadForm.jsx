// LogoUploadForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const LogoUploadForm = ({ jobId, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const token = useSelector(state => state.user.token);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('logo', file);

    try {
      const response = await axios.post(`http://localhost:4000/api/jobs/${jobId}/logo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data) {
        onSuccess(response.data);
      }
    } catch (error) {
      setError('Error uploading logo. Please try again.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="logo">Upload Logo:</label>
        <input type="file" id="logo" name="logo" onChange={handleFileChange} />
      </div>
      <button type="submit">Upload</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LogoUploadForm;
