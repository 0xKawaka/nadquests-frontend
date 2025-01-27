// ProfilePage.js
import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import './Profile.css'; // Importez le fichier CSS

const ProfilePage = () => {
  const { user } = usePrivy();

  // Mock data for collected items (replace with actual data fetching logic)
  const collectedItems = [
    { id: 1, name: 'Item 1', description: 'This is item 1' },
    { id: 2, name: 'Item 2', description: 'This is item 2' },
    { id: 3, name: 'Item 3', description: 'This is item 3' },
  ];

  return (
    <div className="profile-page">
      {user &&
        <div className="profile-container">
          <div className='page-title'>Profile</div>
          <div className="profile-info">
            <h2>User Information</h2>
            <p>Email: {user.email}</p>
            <p>Wallet Address: {user.wallet?.address}</p>
          </div>
          <div className="collected-items">
            <h2>Collected Items</h2>
            {collectedItems.length > 0 ? (
              <ul>
                {collectedItems.map((item) => (
                  <li key={item.id}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items collected yet.</p>
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default ProfilePage;