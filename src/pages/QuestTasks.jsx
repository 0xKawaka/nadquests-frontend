// src/pages/QuestTasksPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quests from '../data/quests.json';
import tasks from '../data/tasks.json';
import './QuestTasks.css';
import { questsImages } from '../images/quests/questsImages'; // Ensure this exports an object mapping quest titles to image paths
import { isQuestLive, getTimeLeft } from '../utils/quests';
import { usePrivy } from '@privy-io/react-auth';
import useAuth from '../hooks/useAuth';
import QuizzTask from '../components/QuizzTask';
import ClaimButton from '../components/ClaimButton';
import CustomConnectButton from '../components/CustomConnectButton';

const QuestTasks = () => {
  const { user } = usePrivy();
  const { title } = useParams(); // Assumes the route is defined with :title
  const navigate = useNavigate();
  const { userX, loading, error, login, logout, ensureAuthenticated } = useAuth();
  

  const quest = quests.find(
    (q) => q.title.toLowerCase() === decodeURIComponent(title).toLowerCase()
  );

  if (!quest) {
    return (
      <div className="quest-tasks-page-container">
        <div className="quest-tasks-page">
          <h1>Quest Not Found</h1>
          <div>The quest you are looking for does not exist.</div>
          <button className="back-button" onClick={() => navigate('/quests')}>
            Back to Quests
          </button>
        </div>
      </div>
    );
  }

  const { startDate, endDate } = quest;
  const liveStatus = isQuestLive(startDate, endDate);
  const timeLeft = getTimeLeft(endDate);

  const questTasks = tasks[quest.title] || [];

  const [completedTasks, setCompletedTasks] = useState({});
  const [showQuiz, setShowQuiz] = useState(null);

  // Handler for task button clicks
  const handleTaskClick = (buttonType, taskId) => {
    
    if (buttonType.toLowerCase() === 'explore') {
      setCompletedTasks((prev) => ({ ...prev, [taskId]: true }));
    } else if (buttonType.toLowerCase() === 'quiz') {
    } else if (buttonType.toLowerCase() === 'follow') {
      ensureAuthenticated();
    }
    if (buttonType.toLowerCase() === 'quiz') {
      if(completedTasks[taskId])
        return;
      setShowQuiz({ taskId, quizTitle: quest.title });
    }
  };

  const handleQuizComplete = (taskId) => {
    setCompletedTasks((prev) => ({ ...prev, [taskId]: true }));
    setShowQuiz(null);
  };

  return (
    <div className="quest-tasks-page-container">
      <div className="quest-tasks-page">
        <button className="back-button" onClick={() => navigate('/quests')}>
          &larr; Back to Quests
        </button>
        <div className="quest-header">
          <div className="quest-image">
            <img
              src={questsImages[quest.title]}
              alt={quest.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/default.jpg'; // Fallback image
              }}
            />
          </div>
          <div className="quest-info">
            <h1>{quest.title}</h1>
            <div>Status: {liveStatus ? 'Live Now' : 'Not Live'}</div>
            {endDate && <div>Time Left: {timeLeft}</div>}
          </div>
        </div>
        {user ? (
          <div className="quest-tasks">
            <div className="quest-task-container">
              {questTasks.map((task, index) => (
                <div key={"task"+index} className="task-item">
                  <div className="task-index-and-description">
                    {completedTasks[index] ? (
                      <>
                        <div className="task-checkmark">&#10003;</div>
                        <div className="task-description task-description-complete">
                          {task.description}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="task-index">{index + 1}</div>
                        <div className="task-description">{task.description}</div>
                      </>
                    )}
                  </div>
                  <button
                    className="task-button"
                    onClick={() => handleTaskClick(task.button, index, task.quizTitle)}
                  >
                    {task.button}
                  </button>
                </div>
              ))}
            </div>
            <ClaimButton />
            {showQuiz && (
              <div className="quiz-modal">
                <QuizzTask
                  taskTitle={showQuiz.quizTitle}
                  onComplete={() => handleQuizComplete(showQuiz.taskId)}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="profile-info-no-user">
            <CustomConnectButton className="big-connect-button" />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestTasks;
