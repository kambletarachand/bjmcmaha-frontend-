import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import DashboardLayout from './Dashboards/DashboardLayout';

const UnifiedAdminDashboard = React.lazy(() => import('./Dashboards/UnifiedAdminDashboard'));
const VisitorDashboard = React.lazy(() => import('./Dashboards/VisitorDashboard'));
const MemberDashboard = React.lazy(() => import('./Dashboards/BodyMemberDashboard'));
const DistrictDashboard = React.lazy(() => import('./Dashboards/DistrictDashboard'));

const DynamicDashboard = () => {
  const role = useSelector((state) => state.visitor.visitor?.role);
  if (!role) return <Navigate to="/login" />;

  const getComponentByRole = () => {
    if (['ADMIN', 'ITIncharge'].includes(role)) {
      return <UnifiedAdminDashboard />;
    }

    if (role.startsWith('DistrictLeader')) {
      return <DistrictDashboard />;
    }

    const bodyMemberRoles = [
      'President',
      'VicePresident_Z1', 'VicePresident_Z2', 'VicePresident_Z3', 'VicePresident_Z4', 'VicePresident_Z5', 'VicePresident_Z6',
      'GeneralSecretary_1', 'GeneralSecretary_2', 'GeneralSecretary_3', 'GeneralSecretary_4',
      'Secretary_1', 'Secretary_2', 'Secretary_3', 'Secretary_4', 'Secretary_5', 'Secretary_6', 'Secretary_7', 'Secretary_8',
      'Treasurer_1', 'Treasurer_2',
      'Member'
    ];

    if (bodyMemberRoles.includes(role)) {
      return <MemberDashboard />;
    }

    return <VisitorDashboard />;
  };

  return (
    <Routes>
      <Route path="/*" element={<DashboardLayout role={role} />}>
        <Route
          path="overview"
          element={<Suspense fallback={<p>Loading...</p>}>{getComponentByRole()}</Suspense>}
        />
      </Route>
    </Routes>
  );
};

export default DynamicDashboard;
