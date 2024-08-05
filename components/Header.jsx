import React from 'react';
import './Header.css'; 


const Header = ({ title }) => {
  return (
    <header className="page-header">
      <h1 className="page-title">{title}</h1>
    
    </header>
  );
};

export default Header;
