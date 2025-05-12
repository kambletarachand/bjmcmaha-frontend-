import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import '../styles/joinus.css';

const JoinUs = ({ email }) => {
  const [message, setMessage] = useState('');

  const handleJoin = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/visitors/assign-membership?email=${email}`);
      setMessage(response.data);
    } catch (error) {
      setMessage('Failed to assign membership.');
    }
  };

  return (
    <Layout>
      <div className="joinus-banner">
        <div className="joinus-content">
          <h1>Join Us</h1>
          <h2>Become a Member of BJMC Maharashtra</h2>
          <p>Join hands with us to contribute towards journalistic freedom and media empowerment in Maharashtra.</p>
          <button onClick={handleJoin}>Activate Membership</button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default JoinUs;
