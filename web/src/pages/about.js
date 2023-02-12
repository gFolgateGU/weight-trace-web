import React from "react";
import axios from 'axios';

export default class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profiles: [],
      myToken: props.tokenMgr.getToken()
    };
  }

  componentDidMount() {
    const config = {
      headers: { Authorization: `Bearer ${this.state.myToken}` }
    };
    axios.get('/api/data', config)
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
    const renderData = data.map((item, idx) => 
        <li key={idx}>{item.Field1}</li>
    );

    return(
        <ul>
            <p>Data below: </p>
            {renderData}
        </ul>
    );
  }
}