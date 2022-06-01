import React from 'react'
import { Link } from 'react-router-dom';
import Register from '../register/Register';

const Login = () => {
const handleLogin=(event)=>{
  console.log("cliked on login");
}
  return (
    <div>
    <div>
        <form onSubmit={handleLogin} method="PUT">
        <div className=''>
        <label>Login</label>
        <br/>
        <input type="email" name="email" placeholder='enter email'></input>
        <br/>
        <input type="password" name="userpassword" placeholder='enter password'></input>
        <input type="submit" name="login" value="Login" ></input>
        </div>
        <div className="container Login">
            <p>Dont't have an account? <Link to="/">Register here</Link>.</p>
        </div>
        </form>
    </div>
    </div>
    
  );
}

export default Login;