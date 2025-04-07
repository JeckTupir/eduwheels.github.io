import React from "react";
import { Box, Typography, Button, Card, CardContent, Grid, IconButton, Avatar } from "@mui/material";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import busImage from '/assets/bus-image.png';
import busLogo from '/assets/bus-logo.png';
import eduwheelsLogo from '/assets/eduwheels-logo.png';
import './LandingPage.css';
import { format, startOfMonth, endOfMonth, addDays, getDay, isToday } from "date-fns";
import { Link } from "react-router-dom"; // Import Link for navigation

const colors = {
    darkBrown: "#5A4040",
    lightGray: "#EEEEEE",
    mutedPink: "#CA8787",
    softPink: "#E1ACAC"
};

export default function LandingPage() {

    const handleSignUpClick = () => {
        // Redirect to the Sign Up page
        window.location.href = '/signup';  // Adjust the path as needed
    };

    const handleLoginClick = () => {
        // Redirect to the Sign Up page
        window.location.href = '/login';  // Adjust the path as needed
    };

    const currentDate = new Date();
    const currentMonthStart = startOfMonth(currentDate); // Start of current month
    const currentMonthEnd = endOfMonth(currentDate); // End of current month
    const daysInMonth = Array.from(
        { length: currentMonthEnd.getDate() }, // Get number of days in the month
        (_, index) => index + 1
    );

    // Get the starting day of the week for the current month
    const startDayOfWeek = getDay(currentMonthStart);

    // Generate the calendar grid with correct days of the week
    const weeks = [];
    let currentDay = 1;

    // Loop through the weeks and generate days
    for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
            // Add an empty space for the days before the start of the month
            if (i === 0 && j < startDayOfWeek) {
                week.push(null);
            } else if (currentDay <= daysInMonth.length) {
                week.push(currentDay);
                currentDay++;
            } else {
                week.push(null); // Empty days after the last day of the month
            }
        }
        weeks.push(week);
    }



    return (
        <Box className="landing-page">
            {/* Top Bar */}
            <Box className="top-bar">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={eduwheelsLogo} className="avatar" />
                </Box>
                <Box>
                    <IconButton className="icon-button" color="inherit"><InfoOutlinedIcon />&nbsp;About Us </IconButton>
                    <IconButton className="icon-button" color="inherit"><DirectionsBusIcon />&nbsp;Vehicles </IconButton>
                    <IconButton className="icon-button" color="inherit"><ContactMailOutlinedIcon />&nbsp;Contact Us </IconButton>
                    <Link to="/signup">
                    <IconButton className="icon-button" color="inherit" onClick={handleSignUpClick}><AccountCircleOutlinedIcon />&nbsp;Sign Up </IconButton>
                    </Link>
                    <Link to="/login">
                        <IconButton className="icon-button" color="inherit" onClick={handleLoginClick}><AccountCircleOutlinedIcon />&nbsp;Login </IconButton>
                    </Link>
                </Box>
            </Box>

            {/* Welcome Section */}
            <Box className="welcome-section">
                <Box>
                    <Typography variant="h2" className="title">Welcome to EduWheels!</Typography>
                    <Typography className="subtitle">At EduWheels, our goal is to revolutionize school transport by ensuring safety, efficiency, and peace of mind for parents, students, and schools.</Typography>
                </Box>
                <img src={busImage} alt="Bus" className="image" />
            </Box>

            {/* Calendar Section */}
            <Box sx={{ backgroundColor: colors.lightGray, minHeight: "100vh" }}>
                {/* Calendar Section */}
                <Box sx={{ backgroundColor: colors.softPink, p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Card sx={{ width: "fit-content", p: 2 }}>
                        <CardContent>
                            <Typography align="center" variant="h6">
                                {format(currentDate, "MMMM yyyy")}
                            </Typography>
                            {/* Calendar Grid */}
                            <Grid container spacing={1} sx={{ mt: 2 }}>
                                {/* Days of the Week */}
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                    <Grid item xs={1.7} key={day}>
                                        <Typography align="center">{day}</Typography>
                                    </Grid>
                                ))}
                                {/* Fill Calendar with Weeks */}
                                {weeks.map((week, index) => (
                                    <Grid container item key={index} spacing={1}>
                                        {week.map((day, index) => (
                                            <Grid item xs={1.7} key={index}>
                                                <Box
                                                    sx={{
                                                        textAlign: "center",
                                                        p: 1,
                                                        backgroundColor: day ? (isToday(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)) ? colors.mutedPink : "transparent") : "transparent",
                                                        borderRadius: 1,
                                                    }}
                                                >
                                                    {day ? day : ""}
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                    <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                        <Button variant="contained" sx={{ backgroundColor: colors.darkBrown }}>Book Now</Button>
                        <Button variant="contained" sx={{ backgroundColor: colors.mutedPink }}>Schedule Later</Button>
                    </Box>
                </Box>
            </Box>

            {/* About Section */}
            <Box className="about-section">
                <Box className="text">
                    <Typography variant="h3" className="title">About EduWheels</Typography>
                    <Typography className="description">
                        A vehicle management system designed for CIT-U to facilitate the scheduling, booking, and reservation of school vehicles. It will optimize transportation for students, faculty, and staff by providing an intelligent recommendation feature for passenger distribution based on events and occupancy needs.
                    </Typography>
                    <Button variant="contained" className="button">Learn More</Button>
                </Box>
                <img src={busLogo} alt="Bus Logo" className="image" />
            </Box>
        </Box>
    );
}