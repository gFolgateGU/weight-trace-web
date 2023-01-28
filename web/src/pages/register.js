import RegisterForm from '../components/RegisterForm'
import '../css/Auth.css'

const Register = () => {
  return (
    <div>
      <div className='container'>
        <h2 className='intro'>Register</h2>
        <p className='intro'>Fill out this form to create an account</p>
      </div>
      <hr />
      <RegisterForm />
      <div className='outro'>
        <p className='center-text'>Already have an account? <a href="/login">Click here</a> to sign in.</p>
      </div>
    </div>
  );
}

export default Register