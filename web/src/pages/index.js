import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
  
const Home = ({ tokenMgr }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const curToken = tokenMgr.getToken();
        if (curToken == 'logged_in') {
          setIsAuthenticated(true);
        } else {
          const response = await axios.get('/api/isauth');
          if (response.data && 'token' in response.data) {
            const token = response.data.token;
            console.log(token)
            tokenMgr.storeToken(token);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, [tokenMgr]);
  
  return (
    <div>
      <h1>Strava Calendar Lite (Home Page)</h1>
      {isAuthenticated ? (
        <div>
          <p>Welcome, authenticated user!</p>
          {/* Add authenticated user content here */}
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          {/* Add content for non-authenticated user here */}
        </div>
      )}
    </div>
  );
};

export default Home;