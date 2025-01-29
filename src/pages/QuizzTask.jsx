import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizzData from '../data/quizz.json';  // Import du fichier JSON directement
import './QuizzTask.css';  // Assurez-vous que le CSS est appliqué

const QuizzTask = () => {
  const { title } = useParams();  // Récupérer le titre du quiz depuis l'URL
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);

  // Charger les données du quiz lors du montage du composant
  useEffect(() => {
    const selectedQuiz = quizzData.find((quiz) => quiz.title === decodeURIComponent(title));
    if (selectedQuiz) {
      setQuiz(selectedQuiz);
    } else {
      console.error('Quiz not found');
    }
  }, [title]);

  if (!quiz) {
    return <div>Loading...</div>;  // Afficher "Loading..." tant que les données ne sont pas chargées
  }

  return (
    <div className="quizz-task-page-container">
      <div className="quizz-task-page">
        {/* Affichage de l'image du quiz */}
        <div className="quiz-header">
          <img src={quiz.image} alt={quiz.title} className="quiz-image" />
          <div className="quiz-info">
            <h1>{quiz.title}</h1>
            <p>{quiz.description}</p>
          </div>
        </div>

        <div className="quiz-questions">
          {quiz.questions.map((question, index) => (
            <div key={question.id} className="question-item">
              <h3>{index + 1}. {question.text}</h3>
              <div className="options">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="option">
                    <input type="radio" name={question.id} value={option} id={`${question.id}-option-${optionIndex}`} />
                    <label htmlFor={`${question.id}-option-${optionIndex}`}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="quiz-footer">
          <button className="back-button" onClick={() => navigate('/quizz')}>Back to Quizzes</button>
          <button className="submit-button" onClick={() => alert('Quiz Submitted!')}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default QuizzTask;
