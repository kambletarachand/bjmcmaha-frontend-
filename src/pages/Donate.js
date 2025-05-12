import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import '../styles/donate.css';

const Donate = ({ email }) => {
  const [message, setMessage] = useState('');

  const handleDonate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/visitors/mark-donor?email=${email}`);
      setMessage(response.data);
    } catch (error) {
      setMessage('Failed to mark donor.');
    }
  };

  return (
    <Layout>
      <div className="donate-section">
        <h1>Donate</h1>
        <p>Support our mission by donating through our secure gateway.</p>
        <button onClick={handleDonate}>Mark as Donor</button>
        {message && <p>{message}</p>}
      </div>
    </Layout>
  );
};

export default Donate;


