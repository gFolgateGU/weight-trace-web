export default class WebTokenGen {
  constructor(props) {
    this.state = {
      token: '',
    };
  }

  clearToken() {
    window.localStorage.removeItem('token');
  }

  storeToken(token) {
    window.localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}