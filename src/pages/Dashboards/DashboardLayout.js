// 4. DashboardLayout.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const DashboardLayout = ({ role }) => {
  const isAdmin = role === 'Admin' || role === 'ITIncharge';
  const isBodyMember = ['President', 'VicePresident_Z1', 'Secretary_1', 'Treasurer_1', 'Member'].includes(role);
  const isDistrictLeader = role?.startsWith('DistrictLeader');
  const isVisitor = role === 'Visitor';

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2>{role} Panel</h2>
        <nav>
          <ul>
            <li><Link to="overview">Overview</Link></li>
            {isAdmin && <li><Link to="manage-users">Manage Users</Link></li>}
            {isBodyMember && <li><Link to="body-docs">Body Documents</Link></li>}
            {isDistrictLeader && <li><Link to="district-updates">District Updates</Link></li>}
            {isVisitor && <li><Link to="apply-membership">Apply for Membership</Link></li>}
          </ul>
        </nav>
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;