import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizzData from '../data/quizz.json';  // Import du fichier JSON directement
import './QuizzTask.css';  // Assurez-vous que le CSS est appliqué

const QuizzTask = () => {
  const { title } = useParams();  // Récupérer le titre du quiz depuis l'URL
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({}); // État pour suivre les réponses des utilisateurs
  const [result, setResult] = useState(null);  // État pour afficher le résultat de la soumission

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

  // Fonction pour gérer les réponses au changement (cocher / décocher)
  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers };
      // Si la question a déjà une réponse, nous allons mettre à jour cette réponse
      if (newAnswers[questionId]) {
        // Si l'option est déjà sélectionnée, la décocher
        if (newAnswers[questionId] === selectedOption) {
          delete newAnswers[questionId]; // Retirer l'option si elle était déjà sélectionnée
        } else {
          newAnswers[questionId] = selectedOption; // Sinon on sélectionne cette option
        }
      } else {
        newAnswers[questionId] = selectedOption; // Sélectionner cette option si elle n'existe pas
      }
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    let score = 0;
    const newResult = quiz.questions.map((question) => {
      // Comparer les réponses sélectionnées avec la réponse correcte
      const userAnswers = answers[question.question]; // Modifier pour utiliser `question.question` ici
      const isCorrect = userAnswers === question.correctAnswer; // Une seule réponse par question
      if (isCorrect) score++;
      return {
        question: question.question,  // Modifier pour utiliser `question.question`
        correctAnswer: question.correctAnswer,
        userAnswers: userAnswers,
        isCorrect,
      };
    });
    setResult(newResult);
    alert(`You got ${score} out of ${quiz.questions.length} correct!`);
  };

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
            <div key={index} className="question-item">
              <h3>{index + 1}. {question.question}</h3>  {/* Modifié pour `question.question` */}
              <div className="options">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="option">
                    <input
                      type="checkbox"  // Utilisation de checkbox
                      name={question.question}  // Utilisation du texte de la question pour le nom
                      value={option}
                      id={`${question.question}-option-${optionIndex}`}  // Utilisation de `question.question` pour un identifiant unique
                      checked={answers[question.question] === option}  // Vérifier si l'option est sélectionnée
                      onChange={() => handleAnswerChange(question.question, option)}  // Gestion du changement
                    />
                    <label htmlFor={`${question.question}-option-${optionIndex}`}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="quiz-footer">
          <button className="back-button" onClick={() => navigate('/quizz')}>Back to Quizzes</button>
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>

        {/* Affichage des résultats après soumission */}
        {result && (
          <div className="quiz-results">
            <h3>Your Results:</h3>
            {result.map((res, index) => (
              <div key={index} className={res.isCorrect ? 'correct' : 'incorrect'}>
                <p><strong>{index + 1}. {res.question}</strong></p>
                <p>Your answer: {res.userAnswers} <span>{res.isCorrect ? 'Correct' : 'Incorrect'}</span></p>
                <p>Correct answer: {res.correctAnswer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizzTask;
