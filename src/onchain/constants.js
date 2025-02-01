import { mainnet } from 'wagmi/chains';

const RPC_URL = "http://localhost:8545";
const BADGES_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

let CHAIN;
if(import.meta.env.MODE === 'development') {
  CHAIN = mainnet;
}
else {
  CHAIN = mainnet;
}


export { CHAIN, RPC_URL, BADGES_ADDRESS };
