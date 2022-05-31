import React from 'react'

const Login = () => {
  return (
    <div>
        <form>
        <div class="container">
        <label>Login</label>
        <br/>
        <input type="email" name="email" placeholder='enter email'></input>
        <br/>
        <input type="password" name="userpassword" placeholder='enter password'></input>
        <input type="submit" name="login" value="Login"></input>
        </div>
        <div class="container Login">
            <p>Dont't have an account? <a href="#">Register here</a>.</p>
        </div>
        </form>
    </div>
    
  )
}

export default Login;