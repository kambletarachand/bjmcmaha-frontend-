// src/LoginComponents/SignupModal.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { signupVisitor } from '../../redux/slices/userSlice';
import '../../styles/signupmodal.css';

const SignupModal = ({ isOpen, onClose, initialEmail }) => {
  const [email, setEmail] = useState(initialEmail || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log('Signup form submitted');
    console.log('Form values:', {
      email,
      password,
      confirmPassword,
      phoneNumber,
      address,
      role,
    });

    if (!email || !password || !confirmPassword || !phoneNumber || !address || !role) {
      console.log('Validation failed: Missing fields');
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      console.log('Validation failed: Passwords do not match');
      setError('Passwords do not match.');
      return;
    }

    // const signupData = {
    //   email,
    //   password,
    //   phoneNumber,
    //   address,
    //   role,
    // };
console.log(email,phoneNumber,address,password,role);
    const signupData = {
      contactDetails: {
        email,
        phoneNumber,
        address,
      },
      password,
      role,
    };
    

    console.log('Attempting to dispatch signupVisitor with:', signupData);

    try {
      const response = await dispatch(signupVisitor(signupData));
      console.log('Signup successful:', response);
      setSuccess('Registration successful! Please check your email for verification.');
      clearFields();
    } catch (err) {
      console.error('Signup failed:', err);
      setError('Failed to register. Please try again.');
    }
  };

  const clearFields = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhoneNumber('');
    setAddress('');
    setRole('');
  };

  const handleClose = () => {
    setSuccess('');
    setError('');
    clearFields();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
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
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Owner">Owner</option>
            <option value="Resident">Resident</option>
            <option value="Community">Community</option>
            <option value="Lawyer">Lawyer</option>
            <option value="Trainer">Trainer</option>
            <option value="Consultant">Consultant</option>
            <option value="Vendor">Vendor</option>
          </select>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit">Sign Up</button>
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
};

export default SignupModal;
