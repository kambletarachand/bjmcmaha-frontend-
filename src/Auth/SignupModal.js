import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../styles/login_css/signupmodal.css';

const SignupModal = ({ isOpen, onClose, initialEmail, onComplete }) => {
  const [email, setEmail] = useState(initialEmail || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setEmail(initialEmail || '');
  }, [initialEmail]);

  const clearFields = () => {
    setPassword('');
    setConfirmPassword('');
    setPhoneNumber('');
    setAddress('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword || !phoneNumber || !address) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await axios.put(`http://localhost:8989/api/visitors/set-password?email=${email}&password=${password}`);
      await axios.put(`http://localhost:8989/api/visitors/update-contact`, {
        email,
        phoneNumber,
        address,
      });

      setSuccess('Account setup complete!');
      clearFields();

      if (onComplete) onComplete();
    } catch (err) {
      console.error(err);
      setError('Failed to update account. Please try again.');
    }
  };

  const handleClose = () => {
    setError('');
    setSuccess('');
    clearFields();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Complete Your Account</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} readOnly />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit">Finish Setup</button>
        </form>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

SignupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialEmail: PropTypes.string,
  onComplete: PropTypes.func,
};

export default SignupModal;
