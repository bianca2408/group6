import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem('user');
    
    if (onLogout) onLogout();
    
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink to="/" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            Home
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/filters" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            Filters
          </NavLink>
        </li>
        <li className="navbar-item logout">
          <button className="navbar-button" onClick={handleLogout}>Disconnect</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
