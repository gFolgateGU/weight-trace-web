import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import '../css/Profile.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Profile = ({ token }) => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [activityStats, setActivityStats] = useState({
        all_run_totals: { distance: 0, count: 0, moving_time: 0, elapsed_time: 0, elevation_gain: 0 },
        all_ride_totals: { distance: 0, count: 0, moving_time: 0, elapsed_time: 0, elevation_gain: 0 },
        all_swim_totals: { distance: 0, count: 0, moving_time: 0, elapsed_time: 0, elevation_gain: 0 },
    });

    const data = {
        labels: ['Running', 'Cycling', 'Swimming'],
        datasets: [
            {
                label: 'Percentage ( % ) of Training',
                data: [
                    100.0 * (activityStats.all_run_totals.count / (activityStats.all_run_totals.count + activityStats.all_ride_totals.count + activityStats.all_swim_totals.count)),
                    100.0 * (activityStats.all_ride_totals.count / (activityStats.all_run_totals.count + activityStats.all_ride_totals.count + activityStats.all_swim_totals.count)),
                    100.0 * (activityStats.all_swim_totals.count / (activityStats.all_run_totals.count + activityStats.all_ride_totals.count + activityStats.all_swim_totals.count)),
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
                console.log(response.data);
                if (response.data) {
                    if ('error' in response.data) {
                        console.log("Failed to load data for the athlete.");
                        console.log(response.data);
                    } else {
                        setFirstName(response.data["firstname"]);
                        setLastName(response.data["lastname"]);
                        setCity(response.data["city"]);
                        setState(response.data["state"]);
                        setImagePath(response.data["profile"]);
                        setActivityStats(response.data["activity_stats"]);
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
    }, []); // Empty array ensures useEffect runs only once when the component mounts

    return (
        <div>
            <div className="profile-container">
                <div className="black-div1"></div>
                <div className="black-div"></div>
                <div>
                    {imagePath && <img src={imagePath} className="profile-image" alt="Description of the image" />}
                </div>
                <div className="profile-name">{firstname} {lastname}</div>
                <div className="profile-name">{city}, {state}</div>
            </div>
            <div className="data-div">
                <div className="summary-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Activity</th>
                                <th>Total Distance (m)</th>
                                <th>Count</th>
                                <th>Moving Time (s)</th>
                                <th>Elapsed Time (s)</th>
                                <th>Elevation Gain (cm)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Running</td>
                                <td>{activityStats.all_run_totals.distance}</td>
                                <td>{activityStats.all_run_totals.count}</td>
                                <td>{activityStats.all_run_totals.moving_time}</td>
                                <td>{activityStats.all_run_totals.elapsed_time}</td>
                                <td>{activityStats.all_run_totals.elevation_gain}</td>
                            </tr>
                            <tr>
                                <td>Cycling</td>
                                <td>{activityStats.all_ride_totals.distance}</td>
                                <td>{activityStats.all_ride_totals.count}</td>
                                <td>{activityStats.all_ride_totals.moving_time}</td>
                                <td>{activityStats.all_ride_totals.elapsed_time}</td>
                                <td>{activityStats.all_ride_totals.elevation_gain}</td>
                            </tr>
                            <tr>
                                <td>Swimming</td>
                                <td>{activityStats.all_swim_totals.distance}</td>
                                <td>{activityStats.all_swim_totals.count}</td>
                                <td>{activityStats.all_swim_totals.moving_time}</td>
                                <td>{activityStats.all_swim_totals.elapsed_time}</td>
                                <td>{activityStats.all_swim_totals.elevation_gain}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className="graph-div">
                    <Doughnut data={data} />
                </div>
            </div>
        </div>
    );
    
};

export default Profile;
