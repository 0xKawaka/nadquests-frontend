import React from 'react';
import { useNavigate } from 'react-router-dom';
import quests from '../data/quests.json';
import { questsImages } from '../images/quests/questsImages';
import './QuestsList.css';
import { isQuestLive, getTimeLeft } from '../utils/quests';

const QuestsList = () => {
  const navigate = useNavigate();
  const handleQuestClick = (title) => {
    navigate(`/quest/${encodeURIComponent(title)}`);
  };

  const liveQuests = quests.filter((quest) => isQuestLive(quest.startDate, quest.endDate));

  return (
    <div className="quests-page">
      <div className='page-title'>Quests</div>
      <div className="quests-list">
        {liveQuests.map((quest) => {
          const timeLeft = getTimeLeft(quest.endDate);
          return (
            <div
              key={quest.title}
              className="quest-item live"
              onClick={() => handleQuestClick(quest.title)}
            >
              <div className="quest-list-image">
                <img src={questsImages[quest.title]} alt={quest.title} />
              </div>
              <div className="quest-details">
                <div className='quests-list-quest-title'>{quest.title}</div>
                <div>{timeLeft && timeLeft + ' left'}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestsList;