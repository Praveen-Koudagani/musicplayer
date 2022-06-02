import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import $ from "jquery";


const Login = () => {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "", 
  })
  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({...user, [name]: value})
  }

  async function handleLogin(event) {
    event.preventDefault();
    const response = await axios.post(`http://localhost:8080/api/auth/login`,{
      'username': user.username,
      'password': user.password
    }).then(console.log("hi"));
    const clean = () => {
        $('input[name="username"]').value="";
        $('input[name="password"]').value="";
    }
    clean();
    console.log(response);
    navigate("/Home");
  }

const handleLogin2=(event)=>{
  console.log("cliked on login"+user.username+":"+user.password);
}
  return (
    <div>
    <div>
        <form onSubmit={handleLogin} method="PUT">
        <div className=''>
        <label>Login</label>
        <br/>
        <input type="text" name="username" placeholder='enter email'onChange={handleInputs}></input>
        <br/>
        <input type="password" name="password" placeholder='enter password'onChange={handleInputs}></input>
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