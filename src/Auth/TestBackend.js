// TestBackend.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestBackend = () => {
  const [message, setMessage] = useState('Checking backend...');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/visitors/test')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        setError('Failed to connect to backend.');
        console.error('❌ Backend test failed:', error.message);
      });
  }, []);

  return (
    <div className="test-backend-container">
      <h1>Backend Test</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default TestBackend;
