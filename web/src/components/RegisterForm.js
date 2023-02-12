import React from "react";
import validator from 'validator';
import axios from 'axios';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailVal: '',
      emailSet: false,
      emailValid: false,

      passwordVal: '',
      passwordSet: false,
      passwordValid: false,

      repeatPasswordVal: '',
      repeatPasswordSet: false,
      repeatPasswordValid: false,

      emailError: false,
      passwordError: false,
      repeatPasswordError: false
    };
  }

  validateEmail = (e) => {
    const email = e.target.value;

    this.setState({emailSet: true});
    this.setState({emailVal: email});

    if (validator.isEmail(email)) {
      this.setState({emailValid: true});
    } else {
      this.setState({emailValid: false});
    }
  }

  validatePassword = (e) => {
    const password = e.target.value;

    this.setState({passwordSet: true});
    this.setState({passwordVal: password});
  
    const isStrong = (validator.isStrongPassword(password, {
      minLength: 8}
    ));
    
    if (isStrong) {
      this.setState({passwordValid: true});

    } else {
      this.setState({passwordValid: false});
    }
  }

  validateRepeatPassword = (e) => {
    const rPassword = e.target.value;

    this.setState({repeatPasswordSet: true});
    this.setState({repeatPasswordVal: rPassword});

    if (rPassword === this.state.passwordVal) {
      this.setState({repeatPasswordValid: true});
    }
    else {
      this.setState({repeatPasswordValid: false});
    }
  }

  submitForm = (e) => {   
    e.preventDefault();

    const emailValid       = this.state.emailValid;
    const passwordValid    = this.state.passwordValid;
    const rptPasswordValid = this.state.repeatPasswordValid;

    this.setState({emailError: !emailValid});
    this.setState({passwordError: !passwordValid});
    this.setState({repeatPasswordError: !rptPasswordValid});

    if (emailValid && passwordValid && rptPasswordValid)
    {
      axios.post('/api/register', {
        email: this.state.emailVal,
        password: this.state.passwordVal
      })
      .then((response) => {
        window.location.href = "/login";
      })
      .catch((error) => {
        // TODO: Add in HTML banner to display errors in an
        // appealing format to the user.
        alert("Error Sending Registration info to Server");
      })
    }
  }

  render() {
    return (
      <div className='form-container'>
        <form onSubmit={(e) => this.submitForm(e)}>
          <label htmlFor="email"><b>Email</b></label>
          { this.state.emailValid ? 
            <span className="tick-mark"></span> : null
          }
          { (!this.state.emailValid && this.state.emailSet) ?
            <span className="x-mark"></span> : null
          } 
          { this.state.emailError ?
            <label htmlFor="email" className='invalid-field'>* Please enter a valid email.</label> : null
          }
          <input onChange={(e) => this.validateEmail(e)} type="text" placeholder='Enter Email'/>

          <label htmlFor="password"><b>Password</b></label>
          { this.state.passwordValid ? 
            <span className="tick-mark"></span> : null
          }
          { (!this.state.passwordValid && this.state.passwordSet) ?
            <span className="x-mark"></span> : null
          }
          { this.state.passwordError ?
            <label htmlFor="email" className='invalid-field'>* Password must be at least 8 characters.</label> : null
          }
          <input onChange={(e) => this.validatePassword(e)} type="password" placeholder='Enter Password' />
   
          <label htmlFor="repeat"><b>Repeat Password</b></label>
          { this.state.repeatPasswordValid ? 
            <span className="tick-mark"></span> : null
          }
          { (!this.state.repeatPasswordValid && this.state.repeatPasswordSet) ?
            <span className="x-mark"></span> : null
          }     
          { this.state.repeatPasswordError ?
            <label htmlFor="email" className='invalid-field'>Passwords do not match.</label> : null
          }
          <input onChange={(e) => this.validateRepeatPassword(e)} type="password" placeholder='Repeat Password' />

          <input type="submit" className='rgr-button' value='Register'/>
        </form>
      </div>
    );
  }
}