import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext'; // Make sure this is imported

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider> {/* This provider was likely missing */}
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
