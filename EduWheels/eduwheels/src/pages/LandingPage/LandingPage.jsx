import React from "react";
import { Box, Typography, Button, Grid, Avatar } from "@mui/material";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import busImage from '/assets/bus-image.png';
import busLogo from '/assets/bus-logo.png';
import eduwheelsLogo from '/assets/eduwheels-logo.png';
import './LandingPage.css';
import { Link } from "react-router-dom";

const colors = {
    darkBrown: "#5A4040",
    lightGray: "#EEEEEE",
    mutedPink: "#CA8787",
    softPink: "#E1ACAC",
    primary: "#007BFF",
    secondary: "#6C757D",
};

export default function LandingPage() {

    const handleSignUpClick = () => {
        window.location.href = '/signup';
    };

    const handleLoginClick = () => {
        window.location.href = '/login';
    };

    return (
        <Box className="landing-page">
            {/* Top Bar */}
            <Box className="top-bar-modern">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Avatar src={eduwheelsLogo} className="logo-modern" />
                </Link>
                <Box className="nav-links-modern">
                    <Button color="inherit" component={Link} to="/about">About Us</Button>
                    <Button color="inherit" component={Link} to="/vehicles">Vehicles</Button>
                    <Button color="inherit" component={Link} to="/contact">Contact Us</Button>
                    <Link to="/signup">
                        <Button variant="outlined" color="primary" onClick={handleSignUpClick}>Sign Up</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="contained" color="primary" onClick={handleLoginClick}>Login</Button>
                    </Link>
                </Box>
            </Box>

            {/* Welcome Section */}
            <Box className="welcome-section-modern">
                <Box className="welcome-text-modern">
                    <Typography variant="h1" className="title-modern">Your Trusted Partner in School Transport</Typography>
                    <Typography variant="subtitle1" className="subtitle-modern">Safe, efficient, and reliable transportation solutions for students, ensuring peace of mind for parents and schools.</Typography>
                    <Button variant="contained" color="primary" size="large" component={Link} to="/book" className="discover-button"> {/* Added class here */}
                        Discover Our Solutions
                    </Button>
                </Box>
                <img src={busImage} alt="Modern School Bus" className="welcome-image-modern" />
            </Box>

            {/* Why Choose Us Section */}
            <Box className="why-choose-section">
                <Typography variant="h2" className="section-title">Why Choose EduWheels?</Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={4} className="feature-item">
                        <DirectionsBusIcon className="feature-icon" color="primary" style={{ fontSize: 40 }} />
                        <Typography variant="h6">Safe & Reliable</Typography>
                        <Typography variant="body2">Stringent safety protocols and well-maintained vehicles for secure transportation.</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} className="feature-item">
                        <HelpOutlineIcon className="feature-icon" color="primary" style={{ fontSize: 40 }} />
                        <Typography variant="h6">Efficient Scheduling</Typography>
                        <Typography variant="body2">Optimize routes and manage bookings effortlessly with our intuitive system.</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} className="feature-item">
                        <InfoOutlinedIcon className="feature-icon" color="primary" style={{ fontSize: 40 }} />
                        <Typography variant="h6">Peace of Mind</Typography>
                        <Typography variant="body2">Real-time tracking and communication tools keep parents informed.</Typography>
                    </Grid>
                </Grid>
            </Box>

            {/* About Section */}
            <Box className="about-section-modern">
                <Box className="about-text-modern">
                    <Typography variant="h3" className="title-modern">About EduWheels</Typography>
                    <Typography className="description-modern">
                        A vehicle management system designed for CIT-U to facilitate the scheduling, booking, and reservation of school vehicles.  We optimize transportation for students, faculty, and staff.
                    </Typography>
                    <Button variant="outlined" color="primary" component={Link} to="/about" className="our-story-button">
                        Our Story
                    </Button>
                </Box>
                <img src={busLogo} alt="Bus Logo" className="about-image-modern" />
            </Box>
        </Box>
    );
}

