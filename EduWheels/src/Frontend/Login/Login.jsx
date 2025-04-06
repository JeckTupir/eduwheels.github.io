import React from "react";
import { useHistory } from "react-router-dom"; // If you're using React Router for navigation

const Login = () => {
    const history = useHistory();

    // Redirect to Google OAuth2 login on button click
    const handleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google"; // Redirect to OAuth2 login
    };

    return (
        <div className="login-container">
            <h2>Welcome to EduWheels</h2>
            <p>Please log in using your Google account:</p>
            <button onClick={handleLogin}>
                Login with Google
            </button>
        </div>
    );
};

export default Login;
