import React from 'react';
import { getClaimSignature } from '../api/get';
import { useAccount } from 'wagmi';
import './MintBadgeButton.css';

const MintBadgeButton = ({ tokenType, mintNFT, isPending, isSuccess, error, isConfirming }) => {
  const { address } = useAccount();
  const [isRequestingSignature, setIsRequestingSignature] = React.useState(false);

  const twitterId = 'testTwitter';

  async function handleMintNFTClick(tokenType) {
    if (isRequestingSignature || isPending) return;
    setIsRequestingSignature(true);
    let res = await getClaimSignature(address, tokenType);
    await mintNFT(tokenType, res.key, twitterId, res.signature);
    setIsRequestingSignature(false);
  }

  return (
    <div>
      <button
        className='mint-badge-button'
        onClick={() => handleMintNFTClick(tokenType)}
        disabled={isPending}
      >
      {isRequestingSignature || isPending || isConfirming ? 'Claiming...' : 'Claim Badge'}
      </button>
      {/* {isSuccess && <p>Transaction successfully sent!</p>} */}
      {/* {hasClaimed && <p>You have already claimed this badge!</p>} */}
      {/* Optionally display error message */}
      {/* {error && <p>{String(error)}</p>} */}
    </div>
  );
};

export default MintBadgeButton;
