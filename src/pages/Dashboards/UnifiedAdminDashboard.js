// UnifiedAdminDashboard.jsx
import React from 'react';
import { Tabs, Tab } from '../AdminPages/Tabs';
import AdminNewsManager from '../AdminPages//AdminNewsManager';
import AdminEventsManager from '../AdminPages/EventPages/AdminEventsManager';
import AdminSchemesManager from '../AdminPages/AdminSchemesManager';
import RoleManagement from '../AdminPages/RoleManagement';
import '../../styles/adminStyles/adminSection.css';
import Layout from '../../components/Layout';

const UnifiedAdminDashboard = () => {
  return (
    <Layout>
    <div className="admin-page-container">
      <h2>🛠️ Admin Dashboard</h2>
      <Tabs>
        <Tab label="User Role Management"><RoleManagement /></Tab>
        <Tab label="News"><AdminNewsManager /></Tab>
        <Tab label="Events"><AdminEventsManager /></Tab>
        <Tab label="Schemes"><AdminSchemesManager /></Tab>
      </Tabs>
    </div>
    </Layout>
  );
};

export default UnifiedAdminDashboard;
