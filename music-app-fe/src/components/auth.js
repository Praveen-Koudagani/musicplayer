class Auth {
    constructor() {
      if(localStorage.getItem("username"))
      this.authenticated = true;
      else
      this.authenticated=false;
    }
  
    login(cb) {
      this.authenticated = true;
      cb();
    }
  
    logout() {
      this.authenticated = false;
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
  }
  
  export default new Auth();
  