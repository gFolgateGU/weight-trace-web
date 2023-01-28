import LoginForm from '../components/LoginForm'
import '../css/Auth.css'

const Login = () => {
  return (
    <div>
      <div className='container'>
        <h2 className='intro'>Login</h2>
        <p className='intro'>Fill out to explore emission data</p>
      </div>
      <hr />
      <LoginForm />
      <div className='outro'>
        <p className='center-text'>Don't have an account? <a href="/register">Click here</a> to register.</p>
      </div>
    </div>
  );
}

export default Login