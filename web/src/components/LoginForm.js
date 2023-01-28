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

  submitForm = () => {  
    alert("Got it!"); 
    // axios.post('/api/register', {
    //   email: this.state.emailVal,
    //   password: this.state.passwordVal
    // })
    // .then((response) => {
    //   window.location.href = "/login";
    // })
    // .catch((error) => {
    //   console.log(error);
    // })

    // TODO: Investigate why form submittal does not always
    // redirect and we need this line here.
    // window.location.href = "/login";
  }

  render() {
    return (
      <div className='form-container'>
        <form onSubmit={this.submitForm}>
          <label for="email"><b>Email</b></label>
          <input onchange={(e) => this.setEmail(e)} type="text" placeholder='Enter Email'/>

          <label for="password"><b>Password</b></label>
          <input onchange={(e) => this.setPassword(e)} type="password" placeholder='Enter Password' />

          <input type="submit" className='rgr-button' value='Login'/>
        </form>
      </div>
    );
  }
}