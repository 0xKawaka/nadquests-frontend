import { createWalletClient, http } from "viem";
import { BADGES_ADDRESS, RPC_URL } from "./constants";
import { BADGES_ABI } from "./abis";

async function mintNFT(wallet, tokenType, key, signature) {
  if (!wallet) {
    console.error("No wallet connected!");
    return;
  }

  const client = createWalletClient({
    transport: http(RPC_URL),
    account: wallet.address,
  });

  try {
    console.log(`Minting tokenType=${tokenType} with key=${key}...`);

    const { request } = await client.simulateContract({
      address: BADGES_ADDRESS,
      abi: BADGES_ABI,
      functionName: "mintNFT",
      args: [tokenType, key, signature],
      account: wallet.address,
    });

    const txHash = await wallet.sendTransaction(request);
    console.log("Transaction hash:", txHash);
  } catch (error) {
    console.error("Error calling mintNFT:", error);
  }
}

export { mintNFT };
