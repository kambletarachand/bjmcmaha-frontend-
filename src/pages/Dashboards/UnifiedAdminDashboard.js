import React from 'react';
import { Tabs, Tab } from '../AdminPages/Tabs';
import AdminNewsManager from '../AdminPages/AdminNewsManager';
import AdminEventsManager from '../AdminPages/EventPages/AdminEventsManager';
import AdminSchemesManager from '../AdminPages/AdminSchemesManager';
import RoleManagement from '../AdminPages/RoleManagement';
import AdminReportsDashboard from './AdminReportsDashboard';  // <-- New import
import '../../styles/adminStyles/adminSection.css';
import Layout from '../../components/Layout';

const UnifiedAdminDashboard = () => {
  console.log("Inside UnifiedAdminDashboard");
  console.log({ RoleManagement, AdminNewsManager, AdminEventsManager, AdminSchemesManager, AdminReportsDashboard });

  return (
    <Layout>
      <div className="admin-page-container">
        <h2>🛠️ Admin Dashboard</h2>
        <Tabs>
          <Tab label="User Role Management"><RoleManagement /></Tab>
          <Tab label="News"><AdminNewsManager /></Tab>
          <Tab label="Events"><AdminEventsManager /></Tab>
          <Tab label="Schemes"><AdminSchemesManager /></Tab>
          <Tab label="Reports"><AdminReportsDashboard /></Tab>  {/* New tab */}
        </Tabs>
      </div>
    </Layout>
  );
};

export default UnifiedAdminDashboard;
