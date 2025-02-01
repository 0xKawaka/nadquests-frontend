import React from 'react';
import { useMintBadge } from '../onchain/useWriteHooks';
import { getClaimSignature } from '../api/get';
import { useAccount } from 'wagmi';
import './MintBadgeButton.css';
import { useReadClaimedBadge } from '../onchain/useReadHooks';

const MintBadgeButton = ({ tokenType }) => {
  const { address, isConnected } = useAccount();
  const [isRequestingSignature, setIsRequestingSignature] = React.useState(false);
  const { mintNFT, isPending, isSuccess, error } = useMintBadge();
  const { hasClaimed, refetchHasClaimed } = useReadClaimedBadge({tokenType, address});

  async function handleMintNFTClic(tokenType) {
    if(isRequestingSignature || isPending) return;
    setIsRequestingSignature(true);
    let res = await getClaimSignature(address, tokenType);
    await mintNFT(tokenType, res.key, res.signature);
    setIsRequestingSignature(false);
  }

  return (
    <div>
      {!hasClaimed && <button className='mint-badge-button' onClick={() => handleMintNFTClic(tokenType)} disabled={isPending}>
        {isRequestingSignature || isPending ? "Claiming..." : "Claim Badge"}
      </button>}
      {isSuccess && <p>Transaction successful!</p>}
      {hasClaimed && <p>You have already claimed this badge!</p>}
    </div>
  );
};

export default MintBadgeButton;
