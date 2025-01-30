import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import LoginButton from './LoginButton';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

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

      {/* Mobile menu toggle button */}
      <div className="navbar-mobile" onClick={toggleMenu}>
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      <LoginButton />
    </nav>
  );
};

export default Navbar;
