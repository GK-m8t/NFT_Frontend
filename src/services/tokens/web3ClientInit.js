import {configureChains, createConfig} from "wagmi";
import {polygon, polygonMumbai, goerli} from "wagmi/chains";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import config from "src/constants/app.config.json";

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("NEXT_PUBLIC_PROJECT_ID required");
}

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const tokenContractAddress = [config.tokenContractAddress];
const chains = [polygon, polygonMumbai, goerli];


const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}
  
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains })

export {
  wagmiConfig,
  tokenContractAddress,
};