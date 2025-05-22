import React from 'react';
import { Navigate } from 'react-router-dom';

import { 
    isPresident,
    isVicePresident, 
  isGeneralSecretary, 
  isSecretary, 
  isBodyMember,
  isDistrictLeader,
  isTreasurer
} from '../pages/Role';

import PresidentDashboard from '../pages/Dashboards/PresidentDashboards/PresidentDashboard';
import VicePresidentDashboard from '../pages/Dashboards/VicePresidentDashboard';
import GeneralSecretaryDashboard from '../pages/Dashboards/GeneralSecretaryDashboard';
import SecretaryDashboard from '../pages/Dashboards/SecretaryDashboard';
import MemberDashboard from '../pages/Dashboards/MemberDashboard'; // assuming you have this
import TreasurerDashboard from '../pages/Dashboards/TreasurerDashboard'; // assuming you have this


function DashboardRouter({ userRole }) {
    console.log("userRole in Dashboardrouter",userRole);
    if (isPresident(userRole)) {
    return <PresidentDashboard />;
  }
  if (isVicePresident(userRole)) {
    return <VicePresidentDashboard />;
  }
  if (isGeneralSecretary(userRole)) {
    return <GeneralSecretaryDashboard />;
  }
  if (isSecretary(userRole)) {
    return <SecretaryDashboard />;
  }
  if (isTreasurer(userRole)) {
    console.log("user is Treasurer");
    return <TreasurerDashboard />;
  }
  if (isBodyMember(userRole)) {
    return <MemberDashboard />;
  }
   
  if (isDistrictLeader(userRole)) {
    return <MemberDashboard />;  // Or DistrictDashboard if you have
  }
  // Unknown or visitor role
  return (
    <div>
      <h3>Not authorized or no dashboard assigned for role: {userRole}</h3>
      {/* Or redirect if you want: <Navigate to="/" replace /> */}
    </div>
  );
}

export default DashboardRouter;
