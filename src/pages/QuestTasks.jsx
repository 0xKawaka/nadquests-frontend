// src/pages/QuestTasksPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quests from '../data/quests.json';
import tasks from '../data/tasks.json';
import './QuestTasks.css';
import { questsImages } from '../assets/images/quests/questsImages'; // Ensure this exports an object mapping quest titles to image paths
import { isQuestLive, getTimeLeft } from '../utils/quests';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import useAuth from '../hooks/useAuth';
import QuizzTask from '../components/QuizzTask';
import CustomConnectButton from '../components/CustomConnectButton';
import MintBadgeButton from '../components/MintBadgeButtton';
import { useMintBadge } from '../onchain/useWriteHooks';
import MintSuccessModal from '../components/MintSuccessModal';
import { useReadClaimedBadge } from '../onchain/useReadHooks';

const QuestTasks = () => {
  const { address, connector, isConnected } = useAccount();
  const { title } = useParams(); // Assumes the route is defined with :title
  const navigate = useNavigate();
  const { userX, loading, error, login, logout, ensureAuthenticated } = useAuth();
  
  // Initiate the minting process
  const { mintNFT, isPending, isSuccess, error: errorMint, hash } = useMintBadge();

  // Listen for transaction receipt updates using the hash from useMintBadge
  const { isLoading: isConfirming, isSuccess: isConfirmed, error: errorMintTx } =
    useWaitForTransactionReceipt({ hash });

  // Local state to control display of the status modal (success/error)
  const [showStatusModal, setShowStatusModal] = useState(false);



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
  const { hasClaimed, refetchHasClaimed } = useReadClaimedBadge({ tokenType: quest.id, address });

  // Show the modal when the transaction is confirmed or an error is detected
  useEffect(() => {
    if (isConfirmed || errorMintTx) {
      setShowStatusModal(true);
    }
    if(isConfirmed) {
      refetchHasClaimed();
    }
  }, [isConfirmed, errorMintTx]);

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
      if (completedTasks[taskId]) return;
      setShowQuiz({ taskId, quizTitle: quest.title });
    } else if (buttonType.toLowerCase() === 'follow') {
      ensureAuthenticated();
    }
  };

  const handleQuizComplete = (taskId) => {
    setCompletedTasks((prev) => ({ ...prev, [taskId]: true }));
    setShowQuiz(null);
  };

  // Handler to close the success/error modal
  const handleCloseStatusModal = () => {
    setShowStatusModal(false);
    // Optionally, reset the mint hook state here if your hook supports it.
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
            <div className="quest-tasks-title">{quest.title}</div>
            <div className="quest-tasks-status">
              Status: {liveStatus ? 'Live Now' : 'Not Live'}
            </div>
            {endDate && <div className="quest-tasks-timeleft">Time Left: {timeLeft}</div>}
          </div>
        </div>
        {isConnected ? (
          <div className="quest-tasks" style={{ position: 'relative' }}>
            {hasClaimed && (
              <div className="claimed-overlay">
                <span className="claimed-text">Claimed</span>
              </div>
            )}
            <div className="quest-task-container">
              {questTasks.map((task, index) => (
                <div key={"task" + index} className="task-item">
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
                    onClick={() => handleTaskClick(task.button, index)}
                  >
                    {task.button}
                  </button>
                </div>
              ))}
            </div>
            {!hasClaimed && (
              <div className="quest-tasks-claim-button-container">
                <MintBadgeButton
                  tokenType={quest.id}
                  mintNFT={mintNFT}
                  isPending={isPending}
                  isSuccess={isSuccess}
                  error={errorMint}
                  isConfirming={isConfirming}
                />
              </div>
            )}
            {showStatusModal && (
              <MintSuccessModal
                questTitle={quest.title}
                questImage={questsImages[quest.title]}
                onClose={handleCloseStatusModal}
                error={errorMintTx}
              />
            )}
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
