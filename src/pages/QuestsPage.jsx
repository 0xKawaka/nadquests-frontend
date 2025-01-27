import React from 'react';
import { useNavigate } from 'react-router-dom';
import quests from '../data/quests.json';
import './QuestsPage.css';

const QuestsPage = () => {
  const navigate = useNavigate();

  // Function to check if a quest is live based on the current date
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
      return true; // If no dates are provided, the quest is always live
    }
  };

  const handleQuestClick = (title) => {
    navigate(`/quest/${encodeURIComponent(title)}`);
  };

  return (
    <div className="quests-page">
      <h1>Quests</h1>
      <ul className="quests-list">
        {quests.map((quest) => {
          const isLive = isQuestLive(quest.startDate, quest.endDate);
          return (
            <li
              key={quest.title}
              className={`quest-item ${isLive ? 'live' : 'not-live'}`}
              onClick={() => handleQuestClick(quest.title)}
            >
              <div className="quest-image">
                <img src={quest.image} alt={quest.title} />
              </div>
              <div className="quest-details">
                <h2>{quest.title}</h2>
                <p>
                  {isLive ? 'Live Now' : 'Coming Soon'} |{' '}
                  {quest.startDate
                    ? `Starts: ${new Date(quest.startDate).toLocaleString()}`
                    : 'No start date'}{' '}
                  |{' '}
                  {quest.endDate
                    ? `Ends: ${new Date(quest.endDate).toLocaleString()}`
                    : 'No end date'}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuestsPage;