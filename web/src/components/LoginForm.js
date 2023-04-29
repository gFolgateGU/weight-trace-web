import React from "react";
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailVal: '',
      emailSet: false,

      passwordVal: '',
      passwordSet: false,

      emailError: false,
      passwordError: false,

      loginError: '',

      tokenMgr: props.tokenMgr
    };
  }

  setEmail = (e) => {
    const email = e.target.value;

    if (email.length < 1) {
      this.setState({emailSet: false});
    }
    else {
      this.setState({emailSet: true});
    }

    this.setState({emailVal: email});
  }

  setPassword = (e) => {
    const password = e.target.value;

    if (password.length < 1) {
      this.setState({passwordSet: false});
    }
    else {
      this.setState({passwordSet: true});
    }

    this.setState({passwordVal: password});
  }

  submitForm = (e) => {
    e.preventDefault()

    const emailSet    = this.state.emailSet;
    const passwordSet = this.state.passwordSet;

    this.setState({emailError: !emailSet});
    this.setState({passwordError: !passwordSet});

    if (emailSet && passwordSet)
    {
      axios.post('/api/login', {
        email: this.state.emailVal,
        password: this.state.passwordVal
      })
      .then((response) => {
        const token = response.data["access_token"];
        this.state.tokenMgr.storeToken(token);
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.response.status === 401) {
          const username = this.state.emailVal;
          const message = 'Invalid username or password for ' + username;
          this.setState({ loginError: message});
        }
        else {
          this.setState({ loginError: 'Cannot connect to server. Please try again later.'})
        }
      });
    }
  }

  render() {
    return (
      <div className='form-container'>
        <form onSubmit={(e) => this.submitForm(e)}>
          <label htmlFor="email"><b>Email</b></label>
          { this.state.emailError ? 
            <span className="x-mark"></span> : null
          }
          { this.state.emailError ?
            <label htmlFor="email" className='invalid-field'>* Please enter an email</label> : null
          }
          <input onChange={(e) => this.setEmail(e)} type="text" placeholder='Enter Email'/>
          <label htmlFor="password"><b>Password</b></label>
          { this.state.passwordError ? 
            <span className="x-mark"></span> : null
          }
          { this.state.passwordError ?
            <label htmlFor="email" className='invalid-field'>* Please enter a password</label> : null
          }
          <input onChange={(e) => this.setPassword(e)} type="password" placeholder='Enter Password' />

          <input type="submit" className='rgr-button' value='Login'/>

          { this.state.loginError && <p>{this.state.loginError}</p>}
        </form>
      </div>
    );
  }
}