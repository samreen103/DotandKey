import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("https://dotandkey.onrender.com/login", { email, password})
    .then((result) => {
      if (result.data === "No user found" || result.data === "Wrong password") {
        alert(result.data);
      } else {
        localStorage.setItem("user", JSON.stringify(result.data));
        navigate("/");
        window.location.reload();
      }

    })
    .catch((err) => console.log(err));
  };

  return (
    <div className="Div1">

      <form className="form" onSubmit={handleSubmit}>

        <h1 className="h1">Dot & Key</h1>

        <h3 className="title">LOGIN</h3>

        <div className="phone">
          <label>Email</label>
          <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required  />
        </div>

        <div className="phone">
          <label>Password</label>
          <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit" className="continuebtn">
          Continue
        </button>

      </form>

    </div>
  );
}

export default Login;