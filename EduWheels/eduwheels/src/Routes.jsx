import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import CompleteProfilePage from './pages/SignUpPage/CompleteProfilePage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import LoggedIn from './pages/LandingPage/LoggedInPage.jsx';
import Profile from './pages/ProfilePage/Profile.jsx';

const RoutesComponent = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/complete-profile" element={<CompleteProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logged-in" element={<LoggedIn />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
};

export default RoutesComponent;