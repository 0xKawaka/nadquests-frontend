// Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import LoginButton from './LoginButton';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <div className="navbar-item" onClick={() => navigate('/')}>
          Home
        </div>
        <div className="navbar-item" onClick={() => navigate('/quests')}>
          Quests
        </div>
        <div className="navbar-item" onClick={() => navigate('/profile')}>
          My Profile
        </div>
      </div>
      <LoginButton />
    </nav>
  );
};

export default Navbar;