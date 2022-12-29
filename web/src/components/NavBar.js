import React from 'react'
import '../css/NavBar.css'

export default class NavBar extends React.Component {
  
  render()
  {
    return (
      <div className="topnav">
        <a className="active" href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <div className="login-container">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </div>
    );    
  }

}