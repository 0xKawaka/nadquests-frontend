import React from 'react';
import { useNavigate } from 'react-router-dom';
import quests from '../data/quests.json';
import { questsImages } from '../images/quests/questsImages';
import './QuestsList.css';

const QuestsPage = () => {
  const navigate = useNavigate();

  const isQuestLive = (startDate, endDate) => {
    const now = new Date();
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return now >= start && now <= end;
    } else if (start) {
      return now >= start;
    } else if (end) {
      return now <= end;
    } else {
      return true;
    }
  };

  const getTimeLeft = (endDate) => {
    if (!endDate) {
      return '';
    }

    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;

    if (diff <= 0) {
      return 'Ended';
    }

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''} left`;
    } else if (hours > 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''} left`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} left`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''} left`;
    }
  };

  const handleQuestClick = (title) => {
    navigate(`/quest/${encodeURIComponent(title)}`);
  };

  const liveQuests = quests.filter((quest) => isQuestLive(quest.startDate, quest.endDate));

  return (
    <div className="quests-page">
      <h1>Quests</h1>
      <div className="quests-list">
        {liveQuests.map((quest) => {
          const timeLeft = getTimeLeft(quest.endDate);
          return (
            <div
              key={quest.title}
              className="quest-item live"
              onClick={() => handleQuestClick(quest.title)}
            >
              <div className="quest-image">
                <img src={questsImages[quest.title]} alt={quest.title} />
              </div>
              <div className="quest-details">
                <h2>{quest.title}</h2>
                <p>{timeLeft}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestsPage;
