// src/pages/UserDashboard.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutVisitor } from '../redux/visitorSlice';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { visitor } = useSelector((state) => state.visitor);

  const handleLogout = () => {
    dispatch(logoutVisitor());
    navigate('/login');
  };

  if (!visitor) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="dashboard-container">
        <h1>Welcome, {visitor.name || visitor.email}</h1>
        <p>Email: {visitor.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Layout>
  );
};

export default UserDashboard;
