import React from 'react';
import { Link } from 'react-router-dom';
import { BODY_MEMBER_ROLES } from '../Role'; // adjust path as needed
import DashboardRouter from '../../router/DashboardRouter'; // adjust path as needed

const DashboardLayout = ({ role }) => {
  const isAdmin = role === 'ADMIN' || role === 'itAdmin';
  const isBodyMember = BODY_MEMBER_ROLES.includes(role);
  const isDistrictLeader = role?.toLowerCase().startsWith('districtleader');
  const isVisitor = role === 'visitor';
  const isPresident = role==='president';

  console.log('role', role);

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
        <DashboardRouter userRole={role} />
      </main>
    </div>
  );
};

export default DashboardLayout;
