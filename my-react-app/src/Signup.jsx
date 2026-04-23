import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("https://dotandkey.onrender.com/signup", {name,email,password })
    .then((result) => {
      if (result.data === "User already exists") {
        alert("User already exists");
      } else {
        alert("Signup successful");
        navigate("/Login");   
      }

    })
    .catch((err) => console.log(err));
  };

  return (
    <div className="Div1">

      <form onSubmit={handleSubmit} className="form">
        <h1 className="h1">Dot & Key</h1>
        <h3 className="title">SIGN UP</h3>
        <div className="phone">
          <label>Name</label>
          <input type="text" placeholder="Enter your Name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="phone">
          <label>Email</label>
          <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)}required />
        </div>
        <div className="phone">
          <label>Password</label>
          <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit" className="continuebtn">
          Continue
        </button>

        <p>Already have an account?</p>
        <Link to="/Login">Login</Link>

      </form>

    </div>
  );
}

export default Signup;