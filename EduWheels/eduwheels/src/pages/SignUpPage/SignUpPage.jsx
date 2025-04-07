import React, { useState } from 'react';
import './SignUpPage.css';
import {TextField, Button, Grid, Box, Typography, IconButton, Divider} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import busLogo from '/assets/eduwheels-logo.png';
import backgroundImage from '/assets/background-image.png';
import axios from 'axios';

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/signup", formData);
            if (response.status === 200) {
                alert("Sign Up Successful!");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Sign Up Failed!");
        }
    };

    const handleBack = () => {
        window.history.back();
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
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} className="form-grid">
                            <Grid item xs={6}>
                                <TextField
                                    label="School ID"
                                    name="schoolid"
                                    value={formData.schoolid}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Email" name="email" value={formData.email} onChange={handleChange} variant="outlined" fullWidth size="small" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} variant="outlined" fullWidth size="small" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} variant="outlined" fullWidth size="small" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Username" name="username" value={formData.username} onChange={handleChange} variant="outlined" fullWidth size="small" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} variant="outlined" fullWidth size="small" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Re-Enter Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} variant="outlined" fullWidth size="small" />
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" fullWidth className="signup-button">
                            Sign Up
                        </Button>
                    </form>

                    <Divider sx={{ }}>OR</Divider>

                    <Typography className="login-switch" style={{textAlign: 'center', color: '#5A4040' }}>
                        <a href="/login" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>Login</a>
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}
