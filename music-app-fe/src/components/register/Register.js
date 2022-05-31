import React from 'react'

const Register = () => {
  return (
    <div>
        <form>
        <div class="container">
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
        <div class="container signin">
            <p>Already have an account? <a href="#">Log in</a>.</p>
        </div>
        </form>
    </div>
        

  );
}

export default Register;