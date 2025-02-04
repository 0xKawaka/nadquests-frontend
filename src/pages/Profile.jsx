import React, { useState } from 'react';
import './Profile.css';
import CustomConnectButton from '../components/CustomConnectButton';
import { useAccount } from 'wagmi';
import badgeImgs from '../assets/images/badge/badges.js';


const ProfilePage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { address, isConnected } = useAccount();



  const collectedItems = [
    { id: 1, name: 'SALMONAD', description: 'This is item 1', unlocked: true },
    { id: 2, name: 'CHOG', description: 'This is item 2', unlocked: true },
    { id: 3, name: 'SNELLY', description: 'This is item 3', unlocked: true },
    { id: 4, name: 'MOYAKI', description: 'This is item 4', unlocked: true },
    { id: 5, name: 'SALANDAK', description: 'This is item 5', unlocked: true },
    { id: 6, name: 'HONK', description: 'This is item 6', unlocked: true },
    { id: 7, name: 'MOKADEL', description: 'This is item 7', unlocked: true },
    { id: 8, name: 'LYRAFFE', description: 'This is item 8', unlocked: true },
    { id: 9, name: 'SPIDERMON', description: 'This is item 9', unlocked: true },
    { id: 10, name: 'MONTIGER', description: 'This is item 10', unlocked: true },
    { id: 11, name: 'MOLANDAK', description: 'This is item 11', unlocked: true },
    { id: 12, name: 'MOUCH', description: 'This is item 12', unlocked: true },
    { id: 13, name: 'MOXY', description: 'This is item 13', unlocked: true },
    { id: 14, name: 'BIRBIE', description: 'This is item 14', unlocked: true },
    { id: 15, name: 'MONCOCK', description: 'This is item 15', unlocked: true },
  ];

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="page-title">Profile</div>
        {isConnected ? (
          <div className="profile-infos-container">
            <div className="profile-info-box">
            </div>
            <div className="collected-items">
              <h2>Collected Items</h2>
              <div className="items-wrapper">
                <div className="items-grid">
                  {collectedItems.map((item) => (
                    <div key={item.id} className="item-card" onClick={() => setSelectedItem(item)}>
                      <img
                        src={badgeImgs[item.id - 1]}
                        alt={item.name}
                        className="item-image"
                        style={{
                          width: '80px',
                          height: '80px',
                          filter: item.unlocked ? 'none' : 'grayscale(100%)',
                        }}
                      />
                      <h3>{item.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="profile-info-no-user">
            <CustomConnectButton className="big-connect-button" />
          </div>
        )}

        {selectedItem && (
          <div className="popup-overlay" onClick={() => setSelectedItem(null)}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedItem.name}</h2>
              <img src={selectedItem.image} alt={selectedItem.name} className="popup-image" />
              <p>{selectedItem.description}</p>
              <button onClick={() => setSelectedItem(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
