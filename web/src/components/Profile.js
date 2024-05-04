import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/Profile.css'

const Profile = ({ token }) => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('')
    const [imagePath, setImagePath] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/athlete');
                if (response.data) {
                    if ('error' in response.data) {
                        console.log("Failed to load data for the athlete.")
                    }
                    else {
                        setFirstName(response.data["firstname"]);
                        setLastName(response.data["lastname"]);
                        setCity(response.data["city"]);
                        setState(response.data["state"]);
                        setImagePath(response.data["profile"]);
                    }
                }
                if (!response.ok) {
                    throw new Error('Failed to fetch image data');
                }
            } catch (error) {
                console.error('Error fetching image data:', error);
            }
        };

        fetchData();
    });

    return (
        <div>
            <div class="profile-container">
                <div class="black-div"></div>
                { <div className="image-component">
                    {imagePath && <img src={imagePath} class="front-image" alt="Description of the image" />}
                </div> }
            </div>
            <div class="profile-info">
                <div class="profile-name">
                    <h1>{firstname} {lastname}</h1>
                </div>
                <div class="profile-specific">
                    <h5>{city}, {state}</h5>
                </div>
            </div>
        </div>

    );
};

export default Profile;