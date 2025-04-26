import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OAuthCallbackHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users/me', { withCredentials: true });
                const user = response.data;
                localStorage.setItem('user', JSON.stringify(user));
                navigate(user.isProfileComplete ? '/logged-in' : '/complete-profile');
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                navigate('/login');
            }
        };
        fetchProfile();
    }, [navigate]);

    return <div>Logging in...</div>; // Optional loading message
};

export default OAuthCallbackHandler;
