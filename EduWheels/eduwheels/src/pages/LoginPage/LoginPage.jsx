import React, { useState } from 'react';
import './LoginPage.css';
import { TextField, Button, Grid, Box, Typography, IconButton, Divider } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import busLogo from '/assets/eduwheels-logo.png';
import backgroundImage from '/assets/background-image.png';
import axios from 'axios';

// // Google logo SVG
// const googleLogo = (
//     <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.93c-.64.37-1.36.58-2 .58-1.66 0-3-1.34-3-3s1.34-3 3-3c.64 0 1.27.21 1.81.58l.19-.93c-.68-.43-1.47-.68-2.5-.68-2.21 0-4 1.79-4 4s1.79 4 4 4c1.03 0 1.82-.34 2.5-.68l-.19-.93zm-1-2.93c-.64.37-1.36.58-2 .58-1.66 0-3-1.34-3-3s1.34-3 3-3c.64 0 1.27.21 1.81.58l.19-.93c-.68-.43-1.47-.68-2.5-.68-2.21 0-4 1.79-4 4s1.79 4 4 4c1.03 0 1.82-.34 2.5-.68l-.19-.93z"></path>
//     </svg>
// );

const API_BASE_URL = "http://localhost:8080";

export default function Login() {
    const [formData, setFormData] = useState({
        schoolid: '',
        password: ''
    });

    // Function to format schoolid as 22-2222-222
    const formatSchoolId = (value) => {
        // Remove all non-numeric characters
        const cleanedValue = value.replace(/\D/g, '');

        // Apply the pattern 22-2222-222
        const formattedValue = cleanedValue.replace(/(\d{2})(\d{4})(\d{3})/, '$1-$2-$3');

        return formattedValue.slice(0, 11); // Limit to 11 characters (the exact length for this pattern)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'schoolid') {
            // Format schoolid while typing
            setFormData((prev) => ({
                ...prev,
                [name]: formatSchoolId(value),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const rawSchoolId = formData.schoolid.replace(/-/g, '');
            const response = await axios.post(
                `${API_BASE_URL}/users/login`,
                { schoolid: rawSchoolId, password: formData.password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                // Redirect to a dashboard or another page
                window.location.href = '/';
            }
        } catch (err) {
            console.error('Login error:', err);
            alert('Login failed!');
        }
    };

    // const handleGoogleLogin = () => {
    //     window.location.href = 'http://localhost:8080/oauth2/authorization/google'; // Redirect to Google OAuth
    // };

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
                        <TextField
                            label="School ID"
                            name="schoolid"
                            value={formData.schoolid}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            size="small"
                            margin="normal"
                            inputProps={{
                                maxLength: 11 // Ensure no more than 11 characters (for the 22-2222-222 format)
                            }}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            size="small"
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" fullWidth className="login-button">
                            Log In
                        </Button>
                    </form>

                    <Divider style={{ color: '#ffffff' }}>OR</Divider>

                    <Typography className="signup-switch">
                        <a href="/signup" className="signup-text" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>Sign Up</a>
                    </Typography>

                    {/*/!* Google login button *!/*/}
                    {/*<Button*/}
                    {/*    onClick={handleGoogleLogin}*/}
                    {/*    variant="contained"*/}
                    {/*    fullWidth*/}
                    {/*    style={{*/}
                    {/*        marginTop: 20,*/}
                    {/*        backgroundColor: '#4285F4',*/}
                    {/*        color: 'white',*/}
                    {/*        padding: '10px 20px',*/}
                    {/*        display: 'flex',*/}
                    {/*        alignItems: 'center',*/}
                    {/*        justifyContent: 'center',*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {googleLogo}*/}
                    {/*    <span style={{ marginLeft: 10 }}>Log In with Google</span>*/}
                    {/*</Button>*/}
                </Box>
            </Box>
        </div>
    );
}
