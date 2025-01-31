import { parseAbi } from 'viem';

const BADGES_ABI = parseAbi([
  "function mintNFT(uint256 tokenType, bytes32 key, bytes memory signature) external"
]);

export { BADGES_ABI };