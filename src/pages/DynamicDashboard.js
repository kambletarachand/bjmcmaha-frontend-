// import React, { Suspense } from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Routes, Route } from 'react-router-dom';
// import DashboardLayout from './Dashboards/DashboardLayout';

// import {
//   ROLES,
//   isBodyMember,
//   isDistrictLeader,
//   isVisitor,
// } from './Role';

// const UnifiedAdminDashboard = React.lazy(() => import('./Dashboards/UnifiedAdminDashboard'));
// const VisitorDashboard = React.lazy(() => import('./Dashboards/VisitorDashboard'));
// const MemberDashboard = React.lazy(() => import('./Dashboards/BodyMemberDashboard'));
// const DistrictDashboard = React.lazy(() => import('./Dashboards/DistrictDashboard'));

// const DynamicDashboard = () => {
//   const role = useSelector((state) => state.visitor.visitor?.role);
// console.log("inside DynamicDashboard",role);
//   if (!role) return <Navigate to="/login" />;

//   const getComponentByRole = () => {
//     // Admin covers both admin, itAdmin, president
//     if ([ROLES.ADMIN, ROLES.IT_ADMIN, ROLES.PRESIDENT].includes(role)) {
//       return <UnifiedAdminDashboard />;
//     }

//     if (isDistrictLeader(role)) {
//       console.log("rendering  DistrictDashboard",role);
//       return <DistrictDashboard />;
//     }

//     if (isBodyMember(role)) {
//       return <MemberDashboard />;
//     }

//     if (isVisitor(role)) {
//       return <VisitorDashboard />;
//     }

//     // Default fallback (if role is unknown)
//     return <VisitorDashboard />;
//   };

//   return (
//     <Routes>
//       <Route path="/*" element={<DashboardLayout role={role} />}>
//         <Route
//           path="overview"
//           element={<Suspense fallback={<p>Loading...</p>}>{getComponentByRole()}</Suspense>}
//         />
//       </Route>
//     </Routes>
//   );
// };

// export default DynamicDashboard;


import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import DashboardLayout from './Dashboards/DashboardLayout';

import {
  ROLES,
  isBodyMember,
  isDistrictLeader,
  isVisitor,
  isVicePresident,
  isGeneralSecretary,
  isSecretary,
} from './Role';

const UnifiedAdminDashboard = React.lazy(() => import('./Dashboards/UnifiedAdminDashboard'));
const VisitorDashboard = React.lazy(() => import('./Dashboards/VisitorDashboard'));
const MemberDashboard = React.lazy(() => import('./Dashboards/MemberDashboard'));
const DistrictDashboard = React.lazy(() => import('./Dashboards/DistrictDashboard'));
const VicePresidentDashboard = React.lazy(() => import('./Dashboards/VicePresidentDashboard'));
const GeneralSecretaryDashboard = React.lazy(() => import('./Dashboards/GeneralSecretaryDashboard'));
const SecretaryDashboard = React.lazy(() => import('./Dashboards/SecretaryDashboard'));

const DynamicDashboard = () => {
  const role = useSelector((state) => state.visitor.visitor?.role);
  console.log("inside DynamicDashboard", role);

  if (!role) return <Navigate to="/login" />;

  const getComponentByRole = () => {
    if ([ROLES.ADMIN, ROLES.IT_ADMIN, ROLES.PRESIDENT].includes(role)) {
      return <UnifiedAdminDashboard />;
    }

    if (isVicePresident(role)) {
      return <VicePresidentDashboard />;
    }

    if (isGeneralSecretary(role)) {
      return <GeneralSecretaryDashboard />;
    }

    if (isSecretary(role)) {
      return <SecretaryDashboard />;
    }

    if (isDistrictLeader(role)) {
      console.log("rendering DistrictDashboard", role);
      return <DistrictDashboard />;
    }

    if (isVisitor(role)) {
      return <VisitorDashboard />;
    }

    // Default fallback for any undefined roles
    return <MemberDashboard />;
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

