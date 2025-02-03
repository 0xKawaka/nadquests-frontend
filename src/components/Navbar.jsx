import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import CSS
import LoginButton from "./LoginButton";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // Close the menu after navigation
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
        <div className="menu-items-container">
          <div className="menu-item">
            <a href="#" onClick={() => handleNavigate("/")}>
              Home
            </a>
          </div>
          <div className="menu-item">
            <a href="#quests" onClick={() => handleNavigate("/quests")}>
              Quests
            </a>
          </div>
          <div className="menu-item">
            <a href="#profile" onClick={() => handleNavigate("/profile")}>
              Profile
            </a>
          </div>
        </div>
        <LoginButton />
      </div>
    </nav>
  );
};

export default Navbar;
