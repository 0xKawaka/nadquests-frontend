import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
// import heroImage from '../images/hero.png';

const Home = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/quests');
  };

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to NadQuests</h1>
          <p className="hero-description">
            NadQuests allows users to explore the monad ecosystem while collecting badges and earning rewards.
          </p>
          <button className="explore-button" onClick={handleExploreClick}>
            Explore Quests
          </button>
        </div>
        {/* <div className="hero-image">
          <img src={heroImage} alt="NadQuests Illustration" />
        </div> */}
      </header>
      <section className="features-section">
        <div className="feature">
          <h2>Discover</h2>
          <p>Embark on exciting quests to explore various aspects of the monad ecosystem.</p>
        </div>
        <div className="feature">
          <h2>Collect</h2>
          <p>Earn badges as you complete quests and showcase your achievements.</p>
        </div>
        <div className="feature">
          <h2>Reward</h2>
          <p>Receive exclusive rewards for your dedication and participation.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
