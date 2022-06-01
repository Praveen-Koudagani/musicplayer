import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Register = () => {

  return (
    <div>
      
    <div>
        <form>
        <div className="container">
        <label>Register</label>
        <br/>
        <input type="text" name="username" placeholder='enter username'></input>
        <br/>
        <input type="email" name="email" placeholder='enter email'></input>
        <br/>
        <input type="password" name="userpassword" placeholder='enter password'></input>
        <br/>
        <input type="password" name="confirmPassword" placeholder='confirm password'></input>
        <br/>
        <input type="submit" name="submit" value="Register"></input>
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