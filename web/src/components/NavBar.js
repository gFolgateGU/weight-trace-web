import React from 'react'
import '../css/NavBar.css'
import axios from 'axios'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tokenMgr: props.tokenMgr,
      myToken: props.tokenMgr.getToken()
    };
  }

  isAuthenticated() {
    const token = this.state.tokenMgr.getToken();
    if (token == null) {
      return false;
    }
    return true;
  }
  
  login = async (e) => {
    e.preventDefault()

    try {
      // Call the API endpoing for login
      const response = await axios.get('/api/auth')
      const auth_url = response.data.auth_url
      window.location.href = auth_url
    } catch (error) {
      console.error('Error logging in: ', error)
    }
  }  

  logout = (e) => {
    this.state.tokenMgr.clearToken();
    window.location.href="/";
  }  

  noAuthNavBar() {
    return (
      <div className="topnav">
        <a className="active" href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <div className="login-container">
          <a href="#" onClick={this.login.bind(this)}>Login</a>
        </div>
      </div>
    );   
  }

  authNavBar() {
    return (
      <div className="topnav">
        <a className="active" href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <div className="login-container">
          <a href="/" onClick={(e) => this.logout(e)}>Logout</a>
        </div>
      </div>
    );   
  }
  
  render() {
    if (this.isAuthenticated()) {
      return this.authNavBar();
    }
    return this.noAuthNavBar();
  }
}