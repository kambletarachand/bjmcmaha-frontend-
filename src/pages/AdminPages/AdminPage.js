// AdminPage.jsx

import React from 'react';
import { Tabs, Tab } from './Tabs'; // custom or UI-lib-based tabs
import AdminNewsManager from './AdminNewsManager';
import AdminEventsManager from './EventPages/AdminEventsManager';
import AdminSchemesManager from './AdminSchemesManager';
import '../../styles/adminStyles/adminSection.css';


const AdminPage = () => {
  return (
    <div className="admin-page-container">
      <h2>Admin Dashboard</h2>
      <Tabs>
        <Tab label="News"><AdminNewsManager /></Tab>
        <Tab label="Events"><AdminEventsManager /></Tab>
        <Tab label="Schemes"><AdminSchemesManager/></Tab>
      </Tabs>
    </div>
  );
};

export default AdminPage;
