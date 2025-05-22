import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import AboutUs from '../pages/AboutUs';
import News from '../pages/News';
import Events from '../pages/Events';
import JoinUs from '../pages/JoinUs';
import Media from '../pages/Media';
import Manifesto from '../pages/Manifesto';
import Donate from '../pages/Donate';
import ContactUs from '../pages/ContactUs';

import DistrictLogin from '../pages/DistrictLogin';
import NotFoundPage from '../pages/NotFoundPage';
import ProjectTree from '../pages/ProjectTree';
import BJMCNational from '../pages/BJMCNational';
import NewsAdmin from '../pages/NewsAdmin';
import GovernmentSchemes from '../pages/GovernmentSchemes'; // ✅ Import
import AdminPage from '../pages/AdminPages/AdminPage';
import MaharastraMapPage from'../pages/MaharastraMapPage';
import OrgTree from '../components/OrgTree';
import LoginPage from '../Auth/LoginPage';
import UserDashboard from '../pages/UserDashBoard';
import DynamicDashboard from '../pages/DynamicDashboard';
import UnifiedAdminDashboard from '../pages/Dashboards/UnifiedAdminDashboard';
import DistrictDashboard from '../pages/Dashboards/DistrictDashboard';
import GeneralSecretaryDashboard from '../pages/Dashboards/GeneralSecretaryDashboard';
import VicePresidentDashboard from '../pages/Dashboards/VicePresidentDashboard';
import SecretaryDashboard from '../pages/Dashboards/SecretaryDashboard';

function AppRoutes() {
  console.log({
    HomePage: typeof HomePage,
    AboutUs: typeof AboutUs,
    News: typeof News,
    Events: typeof Events
  });

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/news" element={<News />} />
      <Route path="/events" element={<Events />} />
      <Route path="/join" element={<JoinUs />} />
      <Route path="/media" element={<Media />} />
      <Route path="/manifesto" element={<Manifesto />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/admin-login" element={<AdminPage/>} /> 
      <Route path="/district-login" element={<DistrictLogin />} />
      <Route path="/tree" element={<ProjectTree />} />
      <Route path="/bjmc-national" element={<BJMCNational />} />
      <Route path="/admin/news" element={<NewsAdmin />} />
      <Route path="/schemes" element={<GovernmentSchemes />} /> {/* ✅ New Route */}
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/maharstra-map" element={<MaharastraMapPage/>} />
      <Route path="/org-tree-view" element={<OrgTree/>}/>
      <Route path="/login"  element={<LoginPage/>}/>
      {/*<Route path="/dashboard" element={<UserDashboard />} />*/}
      <Route path="/dashboard/" element={<DynamicDashboard />} />
      <Route path="/dashboard/manage-users" element={<UnifiedAdminDashboard />} />
      <Route path="/dashboard/district-updates" element={<DistrictDashboard />} />
      <Route path="/dashboard/general-secretary" element={<GeneralSecretaryDashboard/>} />
<Route path="/dashboard/vice-president" element={<VicePresidentDashboard/>} />
<Route path="/dashboard/secretary" element={<SecretaryDashboard />} />

      
      </Routes>
  );
}

export default AppRoutes;
