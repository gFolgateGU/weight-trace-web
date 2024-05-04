import React, { useState, useEffect } from 'react';
import '../css/NavBar.css';
import axios from 'axios';

export default function NavBar({ tokenMgr }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      await checkUserLoginStatus();
    }

    checkStatus();
  }); // Empty dependency array ensures this effect runs only once on component mount

  const checkUserLoginStatus = async () => {
    try {
      const curToken = tokenMgr.getToken();
      if (curToken === 'logged_in') {
        setUserLoggedIn(true);
      } else {
        const response = await axios.get('/api/isauth');
        if (response.data && 'token' in response.data) {
          const token = response.data.token;
          console.log(token)
          tokenMgr.storeToken(token);
          setUserLoggedIn(true);
        } else {
          setUserLoggedIn(false);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setUserLoggedIn(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/auth');
      const authUrl = response.data.auth_url;
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get('/api/logout');
      tokenMgr.clearToken();
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const renderAuthLinks = () => (
    <div className="navbar-item has-dropdown is-hoverable">
      {/* Render profile/logout links */}
      <a href="/" onClick={handleLogout}>Logout</a>
    </div>
  );

  const renderNoAuthLinks = () => (
    <div className="navbar-item has-dropdown is-hoverable">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#" onClick={handleLogin}>Login</a>
    </div>
  );

  return (
    <div className="topnav">
      <a className="active" href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <div className="login-container">
        {userLoggedIn ? renderAuthLinks() : renderNoAuthLinks()}
      </div>
    </div>
  );
}