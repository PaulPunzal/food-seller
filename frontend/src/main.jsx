import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: '14px',
          borderRadius: '10px',
        },
        success: { iconTheme: { primary: '#f97316', secondary: '#fff' } },
      }}
    />
  </React.StrictMode>
);