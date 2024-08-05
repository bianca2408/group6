import React, { useState } from "react";
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "password") {
      localStorage.setItem('user', email);
      onLogin(); 
      navigate("/"); 
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="title">Login</h2>
        <label className="label" htmlFor="email">Email:</label>
        <input
          className="input"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="label" htmlFor="password">Password:</label>
        <input
          className="input"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
