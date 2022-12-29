import React from "react";
import validator from 'validator';

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
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1}
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

  submitForm = () => {
    alert('Form has been submitted');
  }

  render() {
    return (
      <div className='form-container'>
        <form>
          <label for="email"><b>Email</b></label>
          { this.state.emailValid ? 
            <span className="tick-mark"></span> : null
          }
          { (!this.state.emailValid && this.state.emailSet) ?
            <span className="x-mark"></span> : null
          }    
          { this.state.emailError ?
            <label for="email" className='invalid-field'>* Please enter a valid email.</label> : null
          }
          <input onChange={(e) => this.validateEmail(e)} type="text" placeholder='Enter Email'/>

          <label for="password"><b>Password</b></label>
          { this.state.passwordValid ? 
            <span className="tick-mark"></span> : null
          }
          { (!this.state.passwordValid && this.state.passwordSet) ?
            <span className="x-mark"></span> : null
          }
          <p><i>Hint: Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 symbol</i></p>
          { this.state.passwordError ?
            <label for="email" className='invalid-field'>* Password must be at least 6 characters.</label> : null
          }
          <input onChange={(e) => this.validatePassword(e)} type="password" placeholder='Enter Password' />
   
          <label for="repeat"><b>Repeat Password</b></label>
          { this.state.repeatPasswordValid ? 
            <span className="tick-mark"></span> : null
          }
          { (!this.state.repeatPasswordValid && this.state.repeatPasswordSet) ?
            <span className="x-mark"></span> : null
          }     
          { this.state.repeatPasswordError ?
            <label for="email" className='invalid-field'>Passwords do not match.</label> : null
          }
          <input onChange={(e) => this.validateRepeatPassword(e)} type="password" placeholder='Repeat Password' />

          <button onClick={this.submitForm} type="submit" className='rgr-button'><b>Register</b></button>
        </form>
      </div>
    );
  }
}