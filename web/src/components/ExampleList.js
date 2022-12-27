import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default class ExampleList extends React.Component {
   
    state = {
        profiles: []
    }

    componentDidMount() {
        axios.get('/api/data')
          .then(res => {
              const profiles = res.data;
              this.setState({profiles})
          })
          .catch((error) => {
              console.log('Error fetching data')
          })
    }

    render() {
        const data = this.state.profiles;
        console.log(data)
        const renderData = data.map((item, idx) => 
            <li key={idx}>{item.Field1}</li>
        );

        return(
            <ul>
                {renderData}
            </ul>
        );
    }
}