export default class WebTokenGen {
  constructor(props) {
    this.state = {
      token: '',
    };
  }

  clearToken() {
    window.sessionStorage.removeItem('token');
  }

  storeToken(token) {
    window.sessionStorage.setItem('token', token);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }
}