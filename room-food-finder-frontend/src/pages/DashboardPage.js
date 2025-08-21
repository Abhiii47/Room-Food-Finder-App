import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import '../styles/Dashboard.css';
import MyListings from '../components/MyListings';
import CreateListingPage from './CreateListingPage';

// Placeholder components
const Chat = () => <h2>Chat History</h2>;
const Settings = () => <h2>Account Settings</h2>;

// Icons
const ListingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const CreateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;

const DashboardPage = () => {
  const getNavLinkClass = ({ isActive }) => isActive ? 'active' : '';

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <nav>
          <ul className="sidebar-nav">
            {/* CORRECTED: Links now use absolute paths to prevent routing issues */}
            <li><NavLink to="/dashboard/my-listings" className={getNavLinkClass}><ListingsIcon /><span>My Listings</span></NavLink></li>
            <li><NavLink to="/dashboard/create-listing" className={getNavLinkClass}><CreateIcon /><span>Create New Listing</span></NavLink></li>
            <li><NavLink to="/dashboard/chat" className={getNavLinkClass}><ChatIcon /><span>Chat</span></NavLink></li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-content">
        {/* This header is now persistent and will not disappear */}
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Manage your account, listings, and chats here.</p>
        </div>
        <div className="dashboard-routes">
          <Routes>
            {/* The default view now shows "My Listings" */}
            <Route index element={<MyListings />} />
            <Route path="my-listings" element={<MyListings />} />
            <Route path="create-listing" element={<CreateListingPage />} />
            <Route path="chat" element={<Chat />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;



