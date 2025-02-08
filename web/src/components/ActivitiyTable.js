import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Activities({ }) {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivties = () => {
            axios.get('/api/activities')
            .then(res => {
                const profiles = res.data;
                console.log(profiles);
                //this.setState({profiles})
            })
            .catch((error) => {
                console.log('Error fetching data')
            })  
        }

        fetchActivties();
    }, []);

    return (
        <div>
            <h2>Activity Table</h2>
        </div>
    );
}