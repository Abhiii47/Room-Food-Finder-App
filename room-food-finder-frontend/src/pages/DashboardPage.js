import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import '../styles/Dashboard.css';
import ProfilePage from './ProfilePage';
import ChatPage from './ChatPage';
import CreateListingPage from './CreateListingPage';

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <nav>
          <ul className="sidebar-nav">
            <li>
              <Link to="/dashboard" className="nav-item">Dashboard</Link>
            </li>
            <li>
              <Link to="/dashboard/profile" className="nav-item">Profile</Link>
            </li>
            <li>
              <Link to="/dashboard/create-listing" className="nav-item">My Listings</Link>
            </li>
            <li>
              <Link to="/dashboard/chat" className="nav-item">Chat</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <div className="dashboard-header">
              <h1>Welcome to your Dashboard!</h1>
              <p>Manage your account, listings, and chats here.</p>
            </div>
          } />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="create-listing" element={<CreateListingPage />} />
          <Route path="chat" element={<ChatPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardPage;
