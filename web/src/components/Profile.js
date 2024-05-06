import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import '../css/Profile.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const Profile = ({ token }) => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('')
    const [imagePath, setImagePath] = useState('');

    const data = {
        labels: ['Running', 'Cycling', 'Swimming'],
        datasets: [
            {
                label: 'Percentage ( % ) of Training',
                data: [12, 19, 3],
                backgroundColor: [
                    '#000080',
                    '#800000',
                    '#008000',
                ],
                borderColor: [
                    '#000080',
                    '#800000',
                    '#008000',
                ],
                borderWidth: 1,
                redraw: true,
            },
        ],
    };

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
                <div class="black-div1"></div>
                <div class="black-div"></div>
                { <div>
                    {imagePath && <img src={imagePath} class="profile-image" alt="Description of the image" />}
                </div> }
                <div class="profile-name">Grant Folgate</div>
                <div class="profile-name">Baltimore, Maryland</div>
            </div>
            <div class="data-div">
                <div class="graph-div">
                    <Doughnut data={data} />
                </div>
                <div class="text-div">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac convallis velit. Donec ac enim sit amet ligula aliquet malesuada ut in nulla. Duis tincidunt odio libero, a blandit ex finibus et.</p>
                </div>
            </div>
        </div>

    );
};

export default Profile;