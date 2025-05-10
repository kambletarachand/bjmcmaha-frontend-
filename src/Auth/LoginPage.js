// LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignupModal from './SignupModal';
import '../../styles/login.css';
import '../../styles/profile.css';
import '../../styles/signupmodal.css';

const LoginPage = () => {
  const [visitorData, setVisitorData] = useState({ email: '', role: 'user' });
  const [isNewUser, setIsNewUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const [initialEmail, setInitialEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitorData((prevState) => ({ ...prevState, [name]: value }));
    
    if (name === 'email') {
      validateEmail(value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email) ? 'Invalid email format' : '');
  };

  const checkVisitorData = async () => {
    if (emailError) {
      setError('Please fix the errors before submitting');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/visitors/${visitorData.email}`);
      console.log("response.data",response.data);
      if (response.data) {
        setIsNewUser(false);
        const isVerified = response.data.verified;
        if (!isVerified) {
          setEmailSent(true);
          await axios.post(`http://localhost:8080/api/visitors/send-verification`, { email: visitorData.email });
          console.log("sending verification mail");
          setError('Please verify your email before logging in.');
        } else {
          navigateToProfile();
        }
      } else {
        setIsNewUser(true);
        setInitialEmail(visitorData.email);
        setShowSignupModal(true);
      }
    } catch (error) {
      console.error("Error fetching visitor data:", error);
      setError('Failed to fetch visitor data. Please check your email.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    checkVisitorData();
  };

  const handleSignupComplete = () => {
    setShowSignupModal(false);
    setEmailSent(true);
    navigateToProfile();
  };

  const navigateToProfile = () => {
    navigate('/profile', { state: { visitorEmail: visitorData.email } });
  };

  const handleSignup = async (signupData) => {
    console.log("inside handleSignup");
    try {
      const response = await fetch('http://localhost:8080/api/visitors/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up. Please check your details.');
      }

      await response.json();
      handleSignupComplete();
    } catch (error) {
      console.error('Signup error:', error);
      throw error; // Handle this in the modal
    }
    
  };

  if (loading) return <div className="login-container">Loading...</div>;
  if (error) return <div className="login-container">Error: {error}</div>;

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={visitorData.email}
            onChange={handleChange}
            required
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <button type="submit" disabled={!!emailError}>Login</button>
      </form>
      {isNewUser && showSignupModal && (
        <SignupModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          onSignup={handleSignup}
          initialEmail={initialEmail}
        />
      )}
      {emailSent && <p>A verification email has been sent to {initialEmail}. Please check your inbox.</p>}
    </div>
  );
};

export default LoginPage;

