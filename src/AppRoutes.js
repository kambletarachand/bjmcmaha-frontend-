import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import News from './pages/News';
import Events from './pages/Events';
import JoinUs from './pages/JoinUs';
import Media from './pages/Media';
import Manifesto from './pages/Manifesto';
import Donate from './pages/Donate';
import ContactUs from './pages/ContactUs';
import AdminPanel from './pages/AdminPanel';
import DistrictLogin from './pages/DistrictLogin';
import NotFoundPage from './pages/NotFoundPage'; // Make sure this exists
import ProjectTree from './pages/ProjectTree';
//import LoginPage from'../Auth/LoginPage';

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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/news" element={<News />} />
      <Route path="/events" element={<Events />} />
     {/* <Route path="/join" element={<JoinUs />} />*/}
      <Route path="/media" element={<Media />} />
      <Route path="/manifesto" element={<Manifesto />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/admin-login" element={<AdminPanel />} />
      <Route path="/district-login" element={<DistrictLogin />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
