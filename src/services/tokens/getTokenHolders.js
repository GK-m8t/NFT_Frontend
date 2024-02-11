import { readContract, multicall } from "@wagmi/core";
import appConfig from "src/constants/app.config.json";
import tokenABI from "src/web3/abi/ERC721A.json";

const tokenContract = {
  address: appConfig.tokenContractAddress,
  abi: tokenABI,
};

export const getTokenHolders = async () => {
  try {
    var requests = [];
    const holders = [];

    let totalSupply = await readContract({
      ...tokenContract,
      functionName: "totalSupply",
    });
    totalSupply=Number(totalSupply);
    console.log("totalSupply", totalSupply);

    for (let i = 1; i <= totalSupply; i++) {
      requests.push({
        ...tokenContract,
        functionName: "ownerOf",
        args: [i],
      });
      if ((i % 200 === 0&&totalSupply>200) || (totalSupply<=200 && i===totalSupply)) {
        const response = await multicall({ contracts: requests });
        console.log(response)
        for (let i = 0; i < response.length; i++) {
          holders.push(response[i].result);
        }
        requests = [];
      }
    }
    return holders;
  } catch (error) {
    console.log(error);
  }
};
