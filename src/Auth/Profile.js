import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/profile.css';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [visitorData, setVisitorData] = useState({
    email: location.state?.visitorEmail || '',
    name: '',
    phone: '',
    address: '',
    role: 'Visitor',
    id: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  useEffect(() => {
    if (!visitorData.email) {
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:8989/api/visitors/${visitorData.email}`)
      .then(response => {
        if (response.data && response.data.verified) {
          setVisitorData(prevState => ({
            ...prevState,
            ...response.data,
          }));
        } else {
          setError('Email is not verified.');
        }
      })
      .catch(() => setError('Failed to fetch visitor data.'))
      .finally(() => setLoading(false));
  }, [visitorData.email, navigate]);

  const handlePasswordSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8989/api/visitors/request/login', {
        email: visitorData.email,
        password,
      });

      if (response.status === 200) {
        setIsPasswordVerified(true);
      } else {
        setVerificationError('Incorrect password. Please try again.');
      }
    } catch {
      setVerificationError('Failed to verify password. Please try again.');
    }
  };

  useEffect(() => {
    if (isPasswordVerified) {
      switch (visitorData.role) {
        case 'Admin':
          navigate('/admin');
          break;
        case 'Visitor':
          navigate('/user-dashboard');
          break;
        case 'Donor':
          navigate('/donor-dashboard', {
            state: { visitorId: visitorData.id, visitorEmail: visitorData.email, name: visitorData.name },
          });
          break;
        case 'BJMC-Team':
          navigate('/team-dashboard', {
            state: { visitorId: visitorData.id, visitorEmail: visitorData.email, name: visitorData.name },
          });
          break;
        default:
          navigate('/login');
      }
    }
  }, [isPasswordVerified, visitorData, navigate]);

  if (loading) return <div className="profile-container">Loading...</div>;
  if (error) return <div className="profile-container">Error: {error}</div>;

  return (
    <div className="profile-container">
      {isPasswordVerified ? (
        <>
          <h1>Welcome, {visitorData.name}</h1>
          <p>Email: {visitorData.email}</p>
          <p>Phone: {visitorData.phone}</p>
          <p>Address: {visitorData.address}</p>
        </>
      ) : (
        <div>
          <h2>Please enter your password to view your details</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <button onClick={handlePasswordSubmit}>Submit</button>
          {verificationError && <p className="error">{verificationError}</p>}
        </div>
      )}
    </div>
  );
};

export default Profile;
