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
    const [activityStats, setActivityStats] = useState({
        all_run_totals: { distance: 0 },
        all_ride_totals: { distance: 0 },
        all_swim_totals: { distance: 0 }
    });

    const data = {
        labels: ['Running', 'Cycling', 'Swimming'],
        datasets: [
            {
                label: 'Percentage ( % ) of Training',
                data: [
                    activityStats.all_run_totals.distance / (activityStats.all_run_totals.distance + activityStats.all_ride_totals.distance + activityStats.all_swim_totals.distance),
                    activityStats.all_ride_totals.distance / (activityStats.all_run_totals.distance + activityStats.all_ride_totals.distance + activityStats.all_swim_totals.distance),
                    activityStats.all_swim_totals.distance / (activityStats.all_run_totals.distance + activityStats.all_ride_totals.distance + activityStats.all_swim_totals.distance),
                ],
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
                console.log(response.data)
                if (response.data) {
                    if ('error' in response.data) {
                        console.log("Failed to load data for the athlete.")
                        console.log(response.data)
                    }
                    else {
                        setFirstName(response.data["firstname"]);
                        setLastName(response.data["lastname"]);
                        setCity(response.data["city"]);
                        setState(response.data["state"]);
                        setImagePath(response.data["profile"]);
                        setActivityStats(response.data["activity_stats"])
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
                <div class="profile-name">{firstname} {lastname}</div>
                <div class="profile-name">{city}, {state}</div>
            </div>
            <div class="data-div">
                <div class="graph-div">
                    <Doughnut data={data} />
                </div>
                <div class="text-div">
                </div>
            </div>
        </div>

    );
};

export default Profile;