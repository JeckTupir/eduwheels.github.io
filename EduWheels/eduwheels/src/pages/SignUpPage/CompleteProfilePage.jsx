import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const CompleteProfilePage = () => {
    const [schoolid, setSchoolid] = useState('');
    const userId = new URLSearchParams(window.location.search).get('userId'); // Get userId from query params

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/users/update-schoolid', {
                schoolid,
                userId
            });

            if (response.status === 200) {
                alert("School ID updated successfully!");
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Error updating school ID", error);
        }
    };

    return (
        <div>
            <h1>Complete Your Profile</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="School ID"
                    value={schoolid}
                    onChange={(e) => setSchoolid(e.target.value)}
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </div>
    );
};

export default CompleteProfilePage;