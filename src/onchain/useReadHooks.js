import { useReadContract } from 'wagmi';
import badgesABI from './badges.json'
import { BADGES_ADDRESS } from './constants';

const useReadClaimedBadge = ({tokenType, address}) => {
  const { data: hasClaimed, refetchHasClaimed } = useReadContract({
    address: BADGES_ADDRESS,
    abi: badgesABI,
    functionName: 'hasMinted',
    args: [tokenType, address],
    watch: true,
  });

  return { hasClaimed, refetchHasClaimed };
}

export { useReadClaimedBadge };