import React from 'react';
import { useNavigate } from 'react-router-dom';
import quizzes from '../data/quizz.json'; // Importation des quiz
import './QuizzList.css'; // Utilisation de l'ancien CSS

const QuizzList = () => {
  const navigate = useNavigate();

  const handleQuizClick = (title) => {
    navigate(`/quizz/${encodeURIComponent(title)}`); // Redirige vers la page spécifique du quiz
  };

  return (
    <div className="quests-page">
      <div className="page-title">Quizzes</div>
      <div className="quests-list">
        {quizzes.map((quiz, index) => (
          <div
            key={`${quiz.title}-${index}`} // Clé unique pour chaque quiz
            className="quest-item live" // Utilisation de l'ancienne classe pour les quiz
            onClick={() => handleQuizClick(quiz.title)} // Navigation vers le quiz spécifique
          >
            <div className="quest-list-image">
              <img
                src={quiz.image || '/images/default.jpg'} // Image du quiz depuis quizz.json, sinon image par défaut
                alt={quiz.title}
                onError={(e) => { e.target.onerror = null; e.target.src = '/images/default.jpg'; }} // Gestion des erreurs d'image
              />
            </div>
            <div className="quest-details">
              <div className="quests-list-quest-title">{quiz.title}</div>
              <div>{quiz.description}</div> {/* Affichage de la description du quiz */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizzList;
