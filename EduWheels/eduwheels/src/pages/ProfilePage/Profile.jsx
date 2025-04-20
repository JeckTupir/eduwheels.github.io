import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Grid, Paper, CircularProgress } from '@mui/material';
import { AccountCircle, Email, School, Person, CardMembership } from '@mui/icons-material';
import './Profile.css'; // Import the CSS file
import { Alert, AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    // State for user data
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from the backend API
        const fetchUserData = async () => {
            try {
                // Get the authentication token from local storage
                const token = localStorage.getItem('authToken');
                if (!token) {
                    // Redirect to login if no token is found.
                    navigate('/login');
                    return;
                }

                // Make the API request to your Spring Boot backend
                const response = await fetch('/users/profile', { //  the correct endpoint
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token in the header
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    // Handle HTTP errors (e.g., 401 Unauthorized, 500 Internal Server Error)
                    if (response.status === 401) {
                        setError('Unauthorized. Please log in again.');
                        navigate('/login'); // Redirect to login
                    } else if (response.status === 404) {
                        setError('User profile not found.');
                    }
                    else {
                        setError(`Failed to load profile data. Status: ${response.status}`);
                    }
                    setLoading(false);
                    return;
                }

                // Parse the JSON response
                const data = await response.json();
                setUserData(data); // set the user data.
                setLoading(false);
            } catch (err) {
                // Handle network errors or errors during parsing
                setError(`Error: ${err.message}`);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading) {
        return (
            <div className="root">
                <Paper className="profile-paper">
                    <CircularProgress size={80} color="inherit" />
                    <Typography variant="h6" style={{ marginTop: '1rem' }}>Loading Profile...</Typography>
                </Paper>
            </div>
        );
    }

    if (error) {
        return (
            <div className="root">
                <Alert severity="error" variant="filled">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="root">
                <Paper className="profile-paper">
                    <Typography variant="h6">No user data found.  Please login.</Typography>
                </Paper>
            </div>
        );
    }

    return (
        <div className="root">
            <Paper className="profile-paper">
                <div className="avatar-styled">
                    <AccountCircle />
                </div>
                <Typography variant="h4" className="profile-name">
                    {userData.name}
                </Typography>
                <Grid container direction="column" alignItems="flex-start" className="info-container">
                    <div className="info-item">
                        <div className="info-icon">
                            <Person />
                        </div>
                        <Typography className="info-text">
                            Username: {userData.username} {/* username */}
                        </Typography>
                    </div>
                    <div className="info-item">
                        <div className="info-icon">
                            <Email />
                        </div>
                        <Typography className="info-text">
                            Email: {userData.email}
                        </Typography>
                    </div>
                    <div className="info-item">
                        <div className="info-icon">
                            <School />
                        </div>
                        <Typography className="info-text">
                            School ID: {userData.schoolid}
                        </Typography>
                    </div>
                </Grid>
            </Paper>
        </div>
    );
};

export default ProfilePage;
