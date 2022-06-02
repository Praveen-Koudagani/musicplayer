import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Register = () => {
  const [user, setUser] = useState({
    username: "", email: "", 
    password: "", cpassword: ""
  })

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({...user, [name]: value})
  }

  const showData = (event) => {
    event.preventDefault();
    if(user.email) console.log(user)
  }

  return (
    <div>
      
    <div>
        <form>
        <div className="container">
        <label>Register</label>
        <br/>
        <input type="text" name="username" value={user.username} placeholder='enter username' onChange={handleInputs} ></input>
        <br/>
        <input type="email" name="email" value={user.email} placeholder='enter email' onChange={handleInputs}></input>
        <br/>
        <input type="password" name="password" value={user.password} placeholder='enter password' onChange={handleInputs}></input>
        <br/>
        <input type="password" name="cpassword" value={user.cpassword} placeholder='confirm password' onChange={handleInputs}></input>
        <br/>
        <input type="submit" name="submit" value="Register" onClick={showData}></input>
        </div>
        <div className="container signin">
            <p>Already have an account?<Link to="/Login">Login </Link></p>
        </div>
        </form>
    </div>
    </div>
        

  );
}

export default Register;