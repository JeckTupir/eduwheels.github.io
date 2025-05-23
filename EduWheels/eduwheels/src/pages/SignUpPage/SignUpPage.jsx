import React, { useState } from 'react';
import './SignUpPage.css';
import { TextField, Button, Grid, Box, Typography, IconButton, Divider, CircularProgress, Alert } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import busLogo from '/assets/eduwheels-logo.png';
import backgroundImage from '/assets/background-image.png';
import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export default function Signup() {
    const [formData, setFormData] = useState({
        schoolid: '',
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const formatSchoolId = (value) => {
        const digits = value.replace(/\D/g, '');
        const parts = [];
        if (digits.length > 0) parts.push(digits.substring(0, 2));
        if (digits.length > 2) parts.push(digits.substring(2, 6));
        if (digits.length > 6) parts.push(digits.substring(6, 9));
        return parts.join('-');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'schoolid') {
            newValue = formatSchoolId(value);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: newValue
        }));

        if (error) setError(null);
        if (success) setSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const payload = {
            schoolid: formData.schoolid.replace(/-/g, ''),
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            password: formData.password
        };

        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/users/signup`, payload);
            if (response.status === 201) {
                setSuccess("Sign Up Successful! Redirecting to login...");
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                setError(`Unexpected success status: ${response.status}`);
            }
        } catch (err) {
            console.error("Signup error:", err);
            if (err.response) {
                const backendError = err.response.data?.error || err.response.data?.message;
                if (err.response.status === 400 && backendError) {
                    setError(`Sign Up Failed: ${backendError}`);
                } else {
                    setError("Sign Up Failed: Please try again.");
                }
            } else {
                setError(`Sign Up Failed: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        window.location.href = '/';
    };

    const handleGoogleSignup = async (response) => {
        const googleUser = response.profileObj;

        try {
            const result = await axios.post("http://localhost:8080/users/google-login", googleUser);

            if (result.status === 200) {
                if (result.data.message === "Google sign up successful. Please provide your school ID.") {
                    window.location.href = `/complete-profile?userId=${result.data.user.id}`;
                }
            }
        } catch (error) {
            console.error("Google login error", error);
        }
    };


    return (
        <div className="signup-page">
            <Box
                className="signup-container"
                style={{
                    backgroundImage: `linear-gradient(rgba(90,64,64,0.6), rgba(202,135,135,0.6)), url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Box className="signup-form">
                    <IconButton className="back-button" onClick={handleBack}>
                        <ArrowBackIosIcon style={{ color: '#5A4040' }} />
                    </IconButton>
                    <Box className="logo-section">
                        <img src={busLogo} alt="Bus Logo" className="logo" />
                        <Typography variant="h5" className="logo-text"></Typography>
                    </Box>

                    {error && <Alert severity="error" style={{ marginBottom: '1rem' }}>{error}</Alert>}
                    {success && <Alert severity="success" style={{ marginBottom: '1rem' }}>{success}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} className="form-grid">
                            <Grid item xs={6}>
                                <TextField
                                    label="School ID (XX-XXXX-XXX)"
                                    name="schoolid"
                                    value={formData.schoolid}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} variant="outlined" fullWidth size="small" required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} variant="outlined" fullWidth size="small" required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} variant="outlined" fullWidth size="small" required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Username" name="username" value={formData.username} onChange={handleChange} variant="outlined" fullWidth size="small" required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} variant="outlined" fullWidth size="small" required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Re-Enter Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} variant="outlined" fullWidth size="small" required />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            className="signup-button"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                        </Button>
                    </form>

                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={handleGoogleSignup}
                        style={{ marginTop: '1rem', backgroundColor: '#4285F4', color: 'white' }}
                    >
                        Sign Up with Google
                    </Button>

                    <Typography className="login-switch" style={{ textAlign: 'center', color: '#ffffff' }}>
                        Already have an account? <a href="/login" style={{ color: '#5A4040', textDecoration: 'none', fontWeight: 'bold' }}>Login</a>
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}
