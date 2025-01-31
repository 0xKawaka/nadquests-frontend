import { mainnet } from 'wagmi/chains';

const RPC_URL = "http://localhost:8545";
const BADGES_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

let CHAIN;
if(import.meta.env.MODE === 'development') {
  CHAIN = {
    id: 31337,  // Default Hardhat/Foundry network ID
    name: 'Foundry Devnet',
    network: 'foundry',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: { http: ['http://127.0.0.1:8545'] },  // Ensure this matches your Anvil RPC URL
    },
    blockExplorers: {
      default: { name: 'Local Explorer', url: 'http://localhost:4000' },  // Change if using a local explorer
    },
  };
}
else {
  CHAIN = mainnet;
}


export { CHAIN, RPC_URL, BADGES_ADDRESS };
