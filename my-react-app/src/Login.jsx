import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://dotandkey.onrender.com/login', { email, password })
      .then((result) => {
        console.log(result)
        navigate("/Signup");
      })
      .catch((err) => console.log(err));


  };
  return (
    <div class="Div1">
      <form onSubmit={handleSubmit} class="form">

        <div class="div2">
          <p> More than 65L+ Happy Customers</p>
        </div>

        <h1 class="h1">Dot & Key</h1>

        <img
          src="src/images/loginimg.webp" alt="pic" class="logoimg" />

        <h3 class="title">LOG IN / SIGN UP</h3>
        <p class="subtitle">Let's get started</p>

        <div class="phone">
          <label>Email</label>
          <input type="email" name="Email" placeholder="Enter your Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div class="phone">
          <label>Password</label>
          <input type="password" name="Password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="button" class="continuebtn" onClick={handleSubmit}> Continue</button>

        

        <div class="checkbox">
          <input type="checkbox" />
          <p>
            Notify me for any updates/offers using RCS/WABA & SMS
          </p>
        </div>

         <p> Already have an Account</p>
        <Link to="/Signup" class="continuebtn" >Login</Link>

        <p class="terms">
          By proceeding, I accept the <b>T&C</b> and <b>Privacy Policy</b>
        </p>

       

      </form>
    </div>
  );
}

export default Login;