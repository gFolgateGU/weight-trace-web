import React, { useState, useEffect } from 'react'
import '../css/Profile.css'

const Profile = ({ token }) => {
    const [imagePath, setImagePath] = useState('');

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const response = await fetch(apiUrl);
        //         if (!response.ok) {
        //             throw new Error('Failed to fetch image data');
        //         }
        //         const data = await response.json();
        //         setImagePath(data.imagePath); // Assuming the API response has a field imagePath
        //     } catch (error) {
        //         console.error('Error fetching image data:', error);
        //     }
        // };

        setImagePath("https://dgalywyr863hv.cloudfront.net/pictures/athletes/34533226/24353767/6/large.jpg");
        //fetchData();
    });

    return (
        <div className="image-component">
            <h2>Profile</h2>
            {imagePath && <img src={imagePath} alt="Description of the image" />}
        </div>
    );
};

export default Profile;