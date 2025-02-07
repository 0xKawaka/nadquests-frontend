// src/components/MintSuccessModal.jsx
import React, { useState } from 'react';
import './MintSuccessModal.css';

const MintSuccessModal = ({ questTitle, questImage, onClose, error }) => {
  // If there's an error, the title becomes "Claim failed"
  const modalTitle = error ? 'Claim failed' : 'Successfully Claimed!';
  const [showError, setShowError] = useState(false);

  return (
    <div className="success-modal-overlay">
      <div className={`success-modal-container ${error ? 'error' : 'success'}`}>
        <div className="success-close-button" onClick={onClose}>
          &times;
        </div>
        <div className="success-modal-content">
          <img
            src={questImage}
            alt={questTitle}
            className="success-quest-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/default.jpg'; // Fallback image
            }}
          />
          <h2 className="success-modal-title">{modalTitle}</h2>
          {error && (
            <div className="error-details">
              {!showError ? (
                <p className="error-collapsed">
                  <span className="toggle-error" onClick={() => setShowError(true)}>
                    + show error
                  </span>
                </p>
              ) : (
                <div>
                  <p className="error-expanded">{String(error)}</p>
                  <p className="toggle-error" onClick={() => setShowError(false)}>
                    - hide error
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MintSuccessModal;
