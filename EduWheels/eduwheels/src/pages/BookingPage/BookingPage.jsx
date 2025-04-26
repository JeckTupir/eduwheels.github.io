// BookingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingPage.css'; // Link to your page-specific CSS

import { ArrowBackIosNew } from '@mui/icons-material';

const vehicles = [
    {
        name: "Commuter Van — AUVIV",
        imgSrc: "../uploads/9704c05c-15a3-4c18-9d84-0d340701c49b_image.png", // Replace with your actual image paths
    },
    {
        name: "Volvo 9700 Grand L",
        imgSrc: "../uploads/d53ed483-b971-44ee-862e-cc14098e7017_Untitled design (1) 1.png",
        recommended: true,
    },
    {
        name: "Minibus Toyota HiAce",
        imgSrc: "/images/minibus-toyota.png",
    }
];

export default function BookingPage() {
    const navigate = useNavigate();

    const handleBookNow = () => {
        // Navigate to booking confirmation or next step
        alert('Booking functionality coming soon!');
    };

    return (
        <div className="booking-root">
            <div className="booking-header">
                <ArrowBackIosNew className="back-icon" onClick={() => navigate(-1)} />
            </div>

            <div className="booking-container">
                <div className="booking-info">
                    <h2>Booking Info</h2>
                    <p>Please select your booking details</p>

                    <div className="booking-form">
                        <div className="booking-form-group">
                            <label>Pick - Up</label>
                            <select>
                                <option>Select front gate or back gate</option>
                                <option>Front Gate</option>
                                <option>Back Gate</option>
                            </select>
                        </div>
                        <div className="booking-form-group">
                            <label>Drop - Off</label>
                            <input type="text" placeholder="Enter your Address" />
                            <small>Choose in Maps ⓘ</small>
                        </div>
                    </div>
                </div>

                <div className="booking-recommendation">
                    <h3>Booking Recommendation</h3>
                    <p>The vehicles automatically change depending on their capacity and choose the recommended vehicle to book a ride.</p>

                    <div className="vehicle-carousel">
                        {vehicles.map((vehicle, index) => (
                            <div
                                key={index}
                                className={`vehicle-card ${vehicle.recommended ? 'recommended' : ''}`}
                            >
                                <img src={vehicle.imgSrc} alt={vehicle.name} />
                                <h4>{vehicle.name}</h4>
                            </div>
                        ))}
                    </div>

                    <button className="book-now-button" onClick={handleBookNow}>
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}
