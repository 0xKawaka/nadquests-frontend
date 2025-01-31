import React from 'react';
import { useMintBadge } from '../onchain/useMintBadge';
import { getClaimSignature } from '../api/get';
import { useAccount } from 'wagmi';

const MintBadgeButton = ({ tokenType }) => {
  const { address, isConnected } = useAccount();
  const [isRequestingSignature, setIsRequestingSignature] = React.useState(false);
  const { mintNFT, isPending, isSuccess, error } = useMintBadge();

  async function handleMintNFTClic(tokenType) {
    if(isRequestingSignature || isPending) return;
    setIsRequestingSignature(true);
    let res = await getClaimSignature(address, tokenType);
    await mintNFT(tokenType, res.key, res.signature);
    setIsRequestingSignature(false);
  }

  return (
    <div>
      <button className='mint-badge-button' onClick={() => handleMintNFTClic(tokenType)} disabled={isPending}>
        {isRequestingSignature || isPending ? "Claiming..." : "Claim"}
      </button>
      {isSuccess && <p>Transaction successful!</p>}
    </div>
  );
};

export default MintBadgeButton;
