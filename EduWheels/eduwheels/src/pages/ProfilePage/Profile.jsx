import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Alert, AlertTitle, CircularProgress, Grid, Paper } from '@mui/material';
import { AccountCircle, Email, School, Person } from '@mui/icons-material';
import './Profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "http://localhost:8080";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    setError('No authentication token found. Redirecting...');
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`${API_BASE_URL}/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    const data = response.data;
                    setUserData(data);
                    setEditedData({
                        firstName: data.firstName || '',
                        lastName: data.lastName || '',
                        email: data.email || '',
                        schoolId: data.schoolid || '',
                        username: data.username || '',
                    });
                    setLoading(false);
                } else {
                    setError(`Failed to load profile data. Status: ${response.status}`);
                    setLoading(false);
                }
            } catch (err) {
                if (err.response?.status === 401) {
                    setError('Not logged in. Redirecting...');
                    navigate('/login');
                } else {
                    setError('Failed to fetch user profile.');
                }
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedData({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            schoolId: userData.schoolid || '',
            username: userData.username || '',
        });
        setUpdateSuccess(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        setError(null);
        setUpdateSuccess(null);

        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.put(`${API_BASE_URL}/users/me`, editedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setUserData(response.data.user);
                setIsEditing(false);
                setUpdateSuccess('Profile updated successfully!');
            } else {
                setError(`Failed to update profile. Status: ${response.status}`);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile.');
        } finally {
            setUpdateLoading(false);
        }
    };

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
                    <Typography variant="h6">No user data found. Please login.</Typography>
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
                    {userData.firstName} {userData.lastName}
                </Typography>

                {updateSuccess && (
                    <Alert severity="success" sx={{ mt: 2 }}>{updateSuccess}</Alert>
                )}

                {isEditing ? (
                    <Box component="form" onSubmit={handleSubmit} className="info-container">
                        <TextField label="First Name" name="firstName" value={editedData.firstName} onChange={handleInputChange} fullWidth margin="normal" />
                        <TextField label="Last Name" name="lastName" value={editedData.lastName} onChange={handleInputChange} fullWidth margin="normal" />
                        <TextField label="Username" name="username" value={editedData.username} onChange={handleInputChange} fullWidth margin="normal" />
                        <TextField label="Email" name="email" value={editedData.email} disabled fullWidth margin="normal" />
                        <TextField label="School ID" name="schoolId" value={editedData.schoolId} onChange={handleInputChange} fullWidth margin="normal" />

                        <Box sx={{ mt: 2 }}>
                            <Button type="submit" variant="contained" color="primary" disabled={updateLoading}>
                                {updateLoading ? <CircularProgress size={24} /> : 'Save Changes'}
                            </Button>
                            <Button onClick={handleCancelClick} sx={{ ml: 2 }}>Cancel</Button>
                        </Box>
                    </Box>
                ) : (
                    <Grid container direction="column" alignItems="flex-start" className="info-container">
                        <div className="info-item"><div className="info-icon"><Person /></div><Typography className="info-text">Username: {userData.username}</Typography></div>
                        <div className="info-item"><div className="info-icon"><Email /></div><Typography className="info-text">Email: {userData.email}</Typography></div>
                        <div className="info-item"><div className="info-icon"><School /></div><Typography className="info-text">School ID: {userData.schoolid}</Typography></div>
                        <Button onClick={handleEditClick} sx={{ mt: 2 }}>Edit Profile</Button>
                    </Grid>
                )}
            </Paper>
        </div>
    );
};

export default Profile;
