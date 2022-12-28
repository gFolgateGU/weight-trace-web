import '../css/NavBarElement.css'

function NavBarElement() {
  return (
    <div class="topnav">
      <a class="active" href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <div class="login-container">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </div>
  );
}

export default NavBarElement;