import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n'; // ✅ i18next
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

// ✅ Import Provider and your Redux store
import { Provider } from 'react-redux';
import store from './redux/store'; // Adjust path if different

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* ✅ Wrap App in Redux context */}
      <App />
    </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
reportWebVitals();
