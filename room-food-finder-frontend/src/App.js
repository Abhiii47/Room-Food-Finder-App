import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ListingsPage from './pages/ListingsPage';
import CreateListingPage from './pages/CreateListingPage';
import ProfilePage from './pages/ProfilePage'; // <-- New import
import ChatPage from './pages/ChatPage'; // <-- New import

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} /> {/* <-- Updated route */}
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;