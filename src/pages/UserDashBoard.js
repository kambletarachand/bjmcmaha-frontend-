import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutVisitor } from '../redux/slices/visitorSlice';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/userdashboard.css'; // Ensure this file includes your provided styles

const UserDashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { visitor } = useSelector((state) => state.visitor);

  const handleLogout = () => {
    dispatch(logoutVisitor());
    navigate('/login');
  };

  if (!visitor) {
    return (
      <Layout>
        <div className="dashboard-container">
          <p>Loading your data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="dashboard-container">
        <h1>Welcome, {visitor.contactDetails?.name || visitor.email}</h1>
        <p><strong>Email:</strong> {visitor.email}</p>
        {visitor.role && <p><strong>Role:</strong> {visitor.role}</p>}
        {visitor.member && (
          <>
            <p><strong>Membership ID:</strong> {visitor.membershipId}</p>
            <p><strong>Valid:</strong> {visitor.membershipStartDate} → {visitor.membershipEndDate}</p>
          </>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Layout>
  );
};

export default UserDashBoard;
