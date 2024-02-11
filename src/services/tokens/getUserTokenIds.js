import { readContract, multicall } from "@wagmi/core";

import { getTokenHolders } from "./getTokenHolders";
import appConfig from "src/constants/app.config.json";
import tokenABI from "src/web3/abi/ERC721A.json";

const tokenContract = {
  address: appConfig.tokenContractAddress,
  abi: tokenABI,
};

export const getUserTokenIds = async (userAddress) => {
  try {
    const userBalance = await readContract({
      ...tokenContract,
      functionName: "balanceOf",
      args: [userAddress],
    });

    const userTokenIds = [];
    if (userBalance > 0) {
      const tokenHolders = await getTokenHolders();

      for (let i = 0; i < tokenHolders.length; i++) {
        if (tokenHolders[i] === userAddress) {
          // tokenIds start from 1 not 0
          userTokenIds.push(i + 1);
        }
      }
    }
    return userTokenIds;
  } catch (error) {
    console.log(error);
  }
};
