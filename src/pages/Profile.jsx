import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import './Profile.css';
import ConnectButton from '../components/ConnectButton';

const ProfilePage = () => {
  const { user } = usePrivy();
  const [selectedItem, setSelectedItem] = useState(null);

  const collectedItems = [
    { id: 1, name: 'SALMONAD', description: 'This is item 1', image: '/src/images/badge/1.png', unlocked: true },
    { id: 2, name: 'CHOG', description: 'This is item 2', image: '/src/images/badge/2.png', unlocked: true },
    { id: 3, name: 'SNELLY', description: 'This is item 3', image: '/src/images/badge/3.png', unlocked: true },
    { id: 4, name: 'MOYAKI', description: 'This is item 4', image: '/src/images/badge/4.png', unlocked: true },
    { id: 5, name: 'SALANDAK', description: 'This is item 5', image: '/src/images/badge/5.png', unlocked: true },
    { id: 6, name: 'HONK', description: 'This is item 6', image: '/src/images/badge/6.png', unlocked: true },
    { id: 7, name: 'MOKADEL', description: 'This is item 6', image: '/src/images/badge/7.png', unlocked: true },
    { id: 8, name: 'LYRAFFE', description: 'This is item 6', image: '/src/images/badge/8.png', unlocked: true },
    { id: 9, name: 'SPIDERMON', description: 'This is item 3', image: '/src/images/badge/9.png', unlocked: true },
    { id: 10, name: 'MONTIGER', description: 'This is item 4', image: '/src/images/badge/10.png', unlocked: true },
    { id: 11, name: 'MOLANDAK', description: 'This is item 5', image: '/src/images/badge/11.png', unlocked: true },
    { id: 12, name: 'MOUCH', description: 'This is item 6', image: '/src/images/badge/12.png', unlocked: true },
    { id: 13, name: 'MOXY', description: 'This is item 6', image: '/src/images/badge/13.png', unlocked: true },
    { id: 14, name: 'BIRBIE', description: 'This is item 6', image: '/src/images/badge/14.png', unlocked: true },
    { id: 14, name: 'MONCOCK', description: 'This is item 6', image: '/src/images/badge/15.png', unlocked: true },
  ];

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className='page-title'>Profile</div>
        {user ? (
          <div className="profile-infos-container">
            <div className="profile-info-box">
              <h2>👤 User Information</h2>
              <p>📧 Email: {user.email}</p>
              <p>💰 Wallet Address: {user.wallet?.address}</p>
            </div>
            <div className="collected-items">
              <h2>Collected Items</h2>
              <div className="items-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {collectedItems.map((item) => (
                  <div key={item.id} className="item-card" onClick={() => setSelectedItem(item)}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="item-image" 
                      style={{
                        width: '80px', 
                        height: '80px', 
                        filter: item.unlocked ? 'none' : 'grayscale(100%)'
                      }}
                    />
                    <h3>{item.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className='profile-info-no-user'>
            <ConnectButton className="big-connect-button" />
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
