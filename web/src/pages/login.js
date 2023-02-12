import React from "react";
import LoginForm from '../components/LoginForm'
import '../css/Auth.css'

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      temp: 'folgate',
      tokenMgr: props.tokenMgr,
    };
  }

  render() {
    return (
      <div>
        <div className='container'>
          <h2 className='intro'>Login</h2>
          <p className='intro'>Fill out to explore emission data</p>
        </div>
        <hr />
        <LoginForm tokenMgr={this.state.tokenMgr}/>
        <div className='outro'>
          <p className='center-text'>Don't have an account? <a href="/register">Click here</a> to register.</p>
        </div>
      </div>
    );    
  }
}