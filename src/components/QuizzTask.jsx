import React, { useState, useEffect } from 'react';
import quizzData from '../data/quizz.json';  // Import your quiz JSON
import './QuizzTask.css';

const QuizzTask = ({ taskTitle, onComplete }) => {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showResultOverlay, setShowResultOverlay] = useState(false);

  useEffect(() => {
    // Find the quiz matching the passed-in taskTitle
    const selectedQuiz = quizzData.find(
      (quizItem) => quizItem.title === taskTitle
    );
    if (selectedQuiz) {
      setQuiz(selectedQuiz);
    } else {
      console.error('Quiz not found for title:', taskTitle);
    }
  }, [taskTitle]);

  if (!quiz) {
    return <div>Loading quiz...</div>;
  }

  // Handle user's checkbox changes
  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers };

      // If the user had already selected an option for this question
      if (newAnswers[questionId]) {
        // If clicking the same option again, remove it (uncheck)
        if (newAnswers[questionId] === selectedOption) {
          delete newAnswers[questionId];
        } else {
          newAnswers[questionId] = selectedOption;
        }
      } else {
        // Otherwise, set it
        newAnswers[questionId] = selectedOption;
      }

      return newAnswers;
    });
  };

  // On submission, evaluate the score
  const handleSubmit = () => {
    let tempScore = 0;

    quiz.questions.forEach((question) => {
      const userAnswer = answers[question.question];
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) {
        tempScore++;
      }
    });

    setScore(tempScore);
    setShowResultOverlay(true);
  };

  // Close the result overlay
  const handleCloseOverlay = () => {
    setShowResultOverlay(false);
    if (score === quiz.questions.length && onComplete) {
      onComplete();
    }
  };

  // Let user quickly reset answers if desired
  const handleRetake = () => {
    setShowResultOverlay(false);
    setAnswers({});
    setScore(null);
  };

  return (
    <div className="quizz-task-page-container">
      <div className="quizz-task-page">
        <div className="quiz-questions">
          {quiz.questions.map((question, index) => (
            <div key={index} className="question-item">
              <h3>
                {index + 1}. {question.question}
              </h3>
              <div className="options">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="option">
                    <input
                      type="checkbox"
                      name={question.question}
                      value={option}
                      id={`${question.question}-option-${optionIndex}`}
                      checked={answers[question.question] === option}
                      onChange={() => handleAnswerChange(question.question, option)}
                    />
                    <label htmlFor={`${question.question}-option-${optionIndex}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="quiz-footer">
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      {showResultOverlay && (
        <div className="quiz-result-overlay">
          <div className="quiz-result-content">
            <h2>
              You got <span className="quiz-score">{score}</span> out of{' '}
              <span className="quiz-score">{quiz.questions.length}</span> correct!
            </h2>

            {score === quiz.questions.length ? (
              <p className="quiz-perfect-msg">Perfect score! Congratulations!</p>
            ) : (
              <p className="quiz-retake-msg">Please retake the quiz to get all correct.</p>
            )}

            <div className="result-buttons">
              {score !== quiz.questions.length && (
                <button onClick={handleRetake} className="retake-button">
                  Retake Quiz
                </button>
              )}
              <button onClick={handleCloseOverlay} className="close-button">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizzTask;
