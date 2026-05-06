import React, { useState } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

function Adminlogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "1234") {
      navigate("/admindashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-title">Admin Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input">
            <label>Email</label>
            <input type="email"placeholder="Enter admin email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input">
            <label>Password</label>
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}  />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Adminlogin;