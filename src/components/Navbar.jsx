import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import LoginButton from './LoginButton';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // Ferme le menu après la navigation
  };

  return (
    <nav className="menu-container">
      {/* Checkbox pour le menu burger */}
      <input
        type="checkbox"
        aria-label="Toggle menu"
        checked={isMenuOpen}
        onChange={toggleMenu}
      />
      <span></span>
      <span></span>
      <span></span>

      {/* Logo */}
      <a href="/" className="menu-logo">
        <img
          src="https://i.ibb.co/JjPc5rrN/logo2.png"
          alt="My Awesome Website"
        />
      </a>

      {/* Menu items */}
      <div className="menu">
        <ul>
          <li>
            <a href="#" onClick={() => handleNavigate('/')}>
              Home
            </a>
          </li>
          <li>
            <a href="#quests" onClick={() => handleNavigate('/quests')}>
              Quests
            </a>
          </li>
          <li>
            <a href="#profile" onClick={() => handleNavigate('/profile')}>
              My Profile
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <LoginButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;