import axios from 'axios';

const sendWalletAddress = async (walletAddress) => {
  try {
    const response = await axios.post('http://localhost:3000/api/users', {
      walletAddress,
    });
    console.log('Wallet address sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending wallet address:', error);
  }
};

export {sendWalletAddress};