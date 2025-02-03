import React from 'react';
import { useNavigate } from 'react-router-dom';
import quizzes from '../data/quizz.json';
import './QuizzList.css';

const QuizzList = () => {
  const navigate = useNavigate();

  const handleQuizClick = (title) => {
    navigate(`/quizz/${encodeURIComponent(title)}`);
  };

  return (
    <div className="quiz-page">
      <h1 className="page-title">Quizzes</h1>
      <div className="quiz-list">
        {quizzes.map((quiz, index) => (
          <div
            key={`${quiz.title}-${index}`}
            className="quiz-item"
            onClick={() => handleQuizClick(quiz.title)}
          >
            <div className="quiz-item-image">
              <img
                src={quiz.image || '/images/default.jpg'}
                alt={quiz.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/default.jpg';
                }}
              />
            </div>
            <div className="quiz-item-details">
              <h2 className="quiz-item-title">{quiz.title}</h2>
              <p className="quiz-item-description">{quiz.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizzList;
