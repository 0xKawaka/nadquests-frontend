import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Importation du CSS
import LoginButton from './LoginButton'; // Je suppose que vous avez déjà ce composant pour la gestion du login

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // Ferme le menu après navigation
  };

  return (
    <nav className="menu-container">
      {/* Burger menu */}
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
      <a href="#" className="menu-logo">
        <img src="https://i.ibb.co/JjPc5rrN/logo2.png" alt="Logo" />
      </a>

      {/* Menu items */}
      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="#" onClick={() => handleNavigate("/")}>
              Home
            </a>
          </li>
          <li>
            <a href="#quests" onClick={() => handleNavigate("/quests")}>
              Quests
            </a>
          </li>
          <li>
            <a href="#profile" onClick={() => handleNavigate("/profile")}>
              Profile
            </a>
          </li>
          <li>
            <LoginButton /> {/* Ajouter votre bouton de login ici */}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
