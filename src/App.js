import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';
import LanguageSwitcher from './components/LanguageSwitcher'; // ✅ Add this

function App() {
  return (
    <BrowserRouter>
      {/*<LanguageSwitcher /> {/* ✅ Visible globally */}
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
