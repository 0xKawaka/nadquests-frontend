import React from 'react';
import { mintNFT } from '../onchain/execute';
import { useWallets } from "@privy-io/react-auth";

const ClaimButton = () => {
  const { wallets } = useWallets();

  const handleClaim = async () => {
    const wallet = wallets[0];
    await mintNFT(wallet, 1, '0x123', '0x456');
  };

  return (
    <button onClick={handleClaim}>
      Claim
    </button>
  );
};

export default ClaimButton;