import React, { useContext } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/Dashboard.css';
import MyListings from '../components/MyListings';
import CreateListingPage from './CreateListingPage';
import Chat from '../components/Chat';
import MyBookings from '../components/MyBookings';
import ChangePassword from '../components/ChangePassword';

// Icons
const ListingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const CreateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const BookingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const getNavLinkClass = ({ isActive }) => isActive ? 'active' : '';

  if (!user) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <p>Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  // Different sidebar navigation based on user type
  const renderNavigation = () => {
    if (user.userType === 'vendor') {
      return (
        <ul className="sidebar-nav">
          <li><NavLink to="/dashboard/my-listings" className={getNavLinkClass}><ListingsIcon /><span>My Listings</span></NavLink></li>
          <li><NavLink to="/dashboard/create-listing" className={getNavLinkClass}><CreateIcon /><span>Create New Listing</span></NavLink></li>
          <li><NavLink to="/dashboard/chat" className={getNavLinkClass}><ChatIcon /><span>Messages</span></NavLink></li>
          <li><NavLink to="/dashboard/change-password" className={getNavLinkClass}><SettingsIcon /><span>Change Password</span></NavLink></li>
        </ul>
      );
    } else {
      // Student navigation
      return (
        <ul className="sidebar-nav">
          <li><NavLink to="/dashboard/bookings" className={getNavLinkClass}><BookingIcon /><span>My Bookings</span></NavLink></li>
          <li><NavLink to="/dashboard/chat" className={getNavLinkClass}><ChatIcon /><span>Messages</span></NavLink></li>
          <li><NavLink to="/dashboard/change-password" className={getNavLinkClass}><SettingsIcon /><span>Change Password</span></NavLink></li>
        </ul>
      );
    }
  };

  const renderDefaultRoute = () => {
    if (user.userType === 'vendor') {
      return <MyListings />;
    } else {
      return <MyBookings />;
    }
  };

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3>{user.userType === 'vendor' ? 'Vendor Dashboard' : 'Student Dashboard'}</h3>
          <p>Welcome, {user.name}!</p>
        </div>
        <nav>
          {renderNavigation()}
        </nav>
      </aside>
      <main className="dashboard-content">
        <div className="dashboard-routes">
          <Routes>
            <Route index element={renderDefaultRoute()} />
            
            {/* Vendor-only routes */}
            {user.userType === 'vendor' && (
              <>
                <Route path="my-listings" element={<MyListings />} />
                <Route path="create-listing" element={<CreateListingPage />} />
              </>
            )}
            
            {/* Student-only routes */}
            {user.userType === 'student' && (
              <Route path="bookings" element={<MyBookings />} />
            )}
            
            {/* Common routes */}
            <Route path="chat" element={<Chat />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;



