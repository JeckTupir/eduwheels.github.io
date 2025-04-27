import React from 'react';
// Import HashRouter instead of BrowserRouter
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import CompleteProfilePage from './pages/SignUpPage/CompleteProfilePage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import LoggedIn from './pages/LandingPage/LoggedInPage.jsx';
import Profile from './pages/ProfilePage/Profile.jsx';
import Booking from './pages/BookingPage/BookingPage.jsx';
import AdminDashboard from './pages/AdminDashboardPage/AdminDashboardPage.jsx';
import AdminVehicles from './pages/AdminDashboardPage/AdminVehiclesPage.jsx';
// Import other admin pages as you create them
// import AdminBookings from './pages/AdminDashboardPage/AdminBookingsPage.jsx'; // Assuming you have this now
// import AdminReviews from './pages/AdminDashboardPage/AdminReviewsPage.jsx';
// import AdminReports from './pages/AdminDashboardPage/AdminReportsPage.jsx';
import AdminUsers from './pages/AdminDashboardPage/AdminUsersPage.jsx';
import OAuthCallbackHandler from './pages/Handler/OAuthCallbackHandler.jsx';

const RoutesComponent = () => {
    return (
        // Use HashRouter instead of BrowserRouter
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/complete-profile" element={<CompleteProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logged-in" element={<LoggedIn />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/oauth2/callback" element={<OAuthCallbackHandler />} />

                {/* Admin routes nested under /admin */}
                <Route path="/admin" element={<AdminDashboard />}>
                    {/* Define an index route for the default content at /admin */}
                    <Route index element={<div>Welcome to the Admin Dashboard Content</div>} /> {/* Placeholder or your actual Admin Overview component */}
                    <Route path="dashboard" element={<div>Welcome to the Dashboard Content</div>} /> {/* You might make this the index route */}
                    <Route path="vehicles" element={<AdminVehicles />} />
                    <Route path="bookings" element={<AdminBookings />} /> {/* Assuming AdminBookingsPage is ready */}
                    {/* <Route path="reviews" element={<AdminReviews />} /> */}
                    {/* <Route path="reports" element={<AdminReports />} /> */}
                    <Route path="users" element={<AdminUsers />} />
                </Route>

                {/* Add a catch-all route for 404 if desired */}
                {/* <Route path="*" element={<div>404 Not Found</div>} /> */}

            </Routes>
        </Router>
    );
};

export default RoutesComponent;
