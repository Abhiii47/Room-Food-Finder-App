import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ListingsPage from './pages/ListingsPage';
import CreateListingPage from './pages/CreateListingPage';
import ListingDetailPage from './pages/ListingDetailPage';
import EditListingPage from './pages/EditListingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* This wildcard is essential for nested dashboard routes to work */}
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listings/:id" element={<ListingDetailPage />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
          <Route path="/edit-listing/:id" element={<EditListingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;