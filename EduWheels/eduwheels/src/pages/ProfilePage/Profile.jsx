import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    AlertTitle,
    CircularProgress,
    Grid,
    Paper
} from '@mui/material';
import { AccountCircle, Email, School, Person, ArrowBack } from '@mui/icons-material';
import './Profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "http://localhost:8080";

// Helper to format raw digits "123456789" → "12-3456-789"
function formatSchoolId(value = "") {
    const digits = value.replace(/\D/g, '').slice(0, 9);
    const part1 = digits.slice(0, 2);
    const part2 = digits.slice(2, 6);
    const part3 = digits.slice(6, 9);
    let result = part1;
    if (part2) result += '-' + part2;
    if (part3) result += '-' + part3;
    return result;
}

export default function Profile() {
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
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found. Redirecting...');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/users/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = response.data;
                const storedUser = JSON.parse(localStorage.getItem('user')) || {};
                const username = data.username ?? storedUser.username ?? '';

                const mergedData = {
                    ...data,
                    username,
                    schoolid: data.schoolid ?? ''  // ensure we have the raw
                };

                setUserData(mergedData);
                setEditedData({
                    firstName: mergedData.firstName || '',
                    lastName: mergedData.lastName || '',
                    username: mergedData.username,
                    email: mergedData.email || '',
                    // Format the initial schoolId for editing:
                    schoolId: formatSchoolId(mergedData.schoolid)
                });
            } catch (err) {
                const status = err.response?.status;
                if (status === 401) {
                    setError('Not authenticated. Redirecting...');
                    navigate('/login');
                } else {
                    setError('Failed to fetch user profile.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleBackClick = () => navigate(-1);
    const handleEditClick = () => setIsEditing(true);
    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedData({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            username: userData.username || '',
            email: userData.email || '',
            schoolId: formatSchoolId(userData.schoolid)
        });
        setUpdateSuccess(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'schoolId') {
            setEditedData(prev => ({ ...prev, [name]: formatSchoolId(value) }));
        } else {
            setEditedData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        setError(null);
        setUpdateSuccess(null);

        const token = localStorage.getItem('token');
        try {
            // Strip dashes before sending
            const payload = {
                ...editedData,
                schoolId: editedData.schoolId.replace(/-/g, '')
            };

            const response = await axios.put(
                `${API_BASE_URL}/users/me`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const updatedUser = response.data.user;
            setUserData(prev => ({ ...prev, ...updatedUser }));
            setIsEditing(false);
            setUpdateSuccess('Profile updated successfully!');
            localStorage.setItem('user', JSON.stringify(updatedUser));
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
                    <CircularProgress size={80} />
                    <Typography variant="h6" sx={{ mt: 2 }}>Loading Profile...</Typography>
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

    return (
        <div className="root">
            <Paper className="profile-paper">
                {/* Back Button */}
                <Button
                    startIcon={<ArrowBack />}
                    onClick={handleBackClick}
                    sx={{ mb: 2, textTransform: 'none' }}
                >
                    Back
                </Button>

                {/* Avatar & Name */}
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <AccountCircle sx={{ fontSize: 80 }} />
                    <Typography variant="h4" sx={{ mt: 1 }}>
                        {userData.firstName} {userData.lastName}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        @{userData.username}
                    </Typography>
                </Box>

                {updateSuccess && <Alert severity="success" sx={{ mb: 2 }}>{updateSuccess}</Alert>}

                {isEditing ? (
                    <Box component="form" onSubmit={handleSubmit} sx={{ px: 3 }}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="First Name"
                            name="firstName"
                            value={editedData.firstName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Last Name"
                            name="lastName"
                            value={editedData.lastName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Username"
                            name="username"
                            value={editedData.username}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            name="email"
                            value={editedData.email}
                            disabled
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="School ID (xx-xxxx-xxx)"
                            name="schoolId"
                            value={editedData.schoolId}
                            onChange={handleInputChange}
                        />

                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="submit" variant="contained" disabled={updateLoading}>
                                {updateLoading ? <CircularProgress size={24} /> : 'Save Changes'}
                            </Button>
                            <Button onClick={handleCancelClick}>Cancel</Button>
                        </Box>
                    </Box>
                ) : (
                    <Grid container direction="column" spacing={1} sx={{ px: 3 }}>
                        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                            <Person sx={{ mr: 1 }} />
                            <Typography>Username: {userData.username}</Typography>
                        </Grid>
                        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                            <Email sx={{ mr: 1 }} />
                            <Typography>Email: {userData.email}</Typography>
                        </Grid>
                        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                            <School sx={{ mr: 1 }} />
                            <Typography>
                                School ID: {formatSchoolId(userData.schoolid)}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleEditClick} sx={{ mt: 2 }}>
                                Edit Profile
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Paper>
        </div>
    );
}
