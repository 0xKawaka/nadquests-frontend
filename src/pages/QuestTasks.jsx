// src/pages/QuestTasksPage.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quests from '../data/quests.json';
import tasks from '../data/tasks.json';
import './QuestTasks.css';
import { questsImages } from '../images/quests/questsImages'; // Ensure this exports an object mapping quest titles to image paths
import { isQuestLive, getTimeLeft } from '../utils/quests';


const QuestTasks = () => {
  const { title } = useParams(); // Assumes the route is defined with :title
  const navigate = useNavigate();

  // Find the quest based on the title from the URL
  const quest = quests.find(
    (q) => q.title.toLowerCase() === decodeURIComponent(title).toLowerCase()
  );

  // If quest not found, display an error message
  if (!quest) {
    return (
      <div className="quest-tasks-page">
        <h1>Quest Not Found</h1>
        <div>The quest you are looking for does not exist.</div>
        <button onClick={() => navigate('/quests')}>Back to Quests</button>
      </div>
    );
  }

  const { startDate, endDate } = quest;
  const liveStatus = isQuestLive(startDate, endDate);
  const timeLeft = getTimeLeft(endDate);

  const questTasks = tasks[quest.title] || [];

  return (
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
      <div className="quest-tasks">
        <h2>Tasks</h2>
        <div className='quest-task-container'>
          {questTasks.map((task, index) => (
            <div key={index} className="task-item">
              <div className="task-index-and-description">
                <div className='task-index'>{index}</div>
                <div>{task.description}</div>
              </div>
              <button
                className="task-button"
                onClick={() => handleTaskClick(task.button)}
              >
                {task.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Handler for task button clicks
  function handleTaskClick(buttonType) {
    // Implement navigation or functionality based on button type
    // For example:
    if (buttonType.toLowerCase() === 'visit') {
      navigate(`/quest/${encodeURIComponent(quest.title)}/visit`);
    } else if (buttonType.toLowerCase() === 'quiz') {
      navigate(`/quest/${encodeURIComponent(quest.title)}/quiz`);
    }
  }
};

export default QuestTasks;
