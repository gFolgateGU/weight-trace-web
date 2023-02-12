import React from "react";
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailVal: '',
      emailSet: false,
      emailValid: false,

      passwordVal: '',
      passwordSet: false,
      passwordValid: false,

      emailError: false,
      passwordError: false,

      tokenMgr: props.tokenMgr
    };
  }

  setEmail = (e) => {
    const email = e.target.value;

    this.setState({emailSet: true});
    this.setState({emailVal: email});
  }

  setPassword = (e) => {
    const password = e.target.value;

    this.setState({passwordSet: true});
    this.setState({passwordVal: password});
  }

  submitForm = (e) => {
    e.preventDefault()

    axios.post('/api/login', {
      email: this.state.emailVal,
      password: this.state.passwordVal
    })
    .then((response) => {
      const token = response.data["access_token"];
      this.state.tokenMgr.storeToken(token);
    })
    .catch((error) => {
      console.log(error);
      alert("ERROR: Unable to send data to server.");
    })
  }

  render() {
    return (
      <div className='form-container'>
        <form onSubmit={(e) => this.submitForm(e)}>
          <label htmlFor="email"><b>Email</b></label>
          <input onChange={(e) => this.setEmail(e)} type="text" placeholder='Enter Email'/>

          <label htmlFor="password"><b>Password</b></label>
          <input onChange={(e) => this.setPassword(e)} type="password" placeholder='Enter Password' />

          <input type="submit" className='rgr-button' value='Login'/>
        </form>
      </div>
    );
  }
}