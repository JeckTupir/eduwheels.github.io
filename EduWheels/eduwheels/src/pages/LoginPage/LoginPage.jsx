import React, { useState } from 'react';
import './LoginPage.css';
import {TextField, Button, Grid, Box, Typography, IconButton, Divider} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import busLogo from '/assets/eduwheels-logo.png';
import backgroundImage from '/assets/background-image.png';
import axios from 'axios';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/login", formData);
            if (response.status === 200) {
                alert("Login Successful!");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login Failed!");
        }
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="login-page">
                <Box
                    className="login-container"
                    style={{
                        backgroundImage: `linear-gradient(rgba(90,64,64,0.6), rgba(202,135,135,0.6)), url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <Box className="login-form">
                        <IconButton className="back-button" onClick={handleBack}>
                            <ArrowBackIosIcon style={{ color: '#5A4040' }} />
                        </IconButton>
                        <Box className="logo-section">
                            <img src={busLogo} alt="Bus Logo" className="logo" />
                            <Typography variant="h5" className="logo-text"></Typography>
                        </Box>
                        <form onSubmit={handleSubmit} className="login-input-form">
                            <TextField label="Username" name="username" value={formData.username} onChange={handleChange} variant="outlined" fullWidth size="small" margin="normal" />
                            <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} variant="outlined" fullWidth size="small" margin="normal" />
                            <Button type="submit" variant="contained" fullWidth className="login-button">
                                Log In
                            </Button>
                        </form>

                        <Divider sx={{ }}>OR</Divider>

                    <Typography className="signup-switch" style={{ textAlign: 'center', color: '#5A4040' }}>
                        <a href="/signup" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>Sign up</a>
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}