import { readContract, multicall } from "@wagmi/core";

import appConfig from "src/constants/app.config.json";
import tokenABI from "src/web3/abi/ERC721A.json";

const tokenContract = {
  address: appConfig.tokenContractAddress,
  abi: tokenABI,
};

export const getBaseURI = async () => {
  try{
  const baseURI = await readContract({
    ...tokenContract,
    functionName: "baseURI",
  });
  return baseURI;
}catch(error){
  console.log(error)
}
};

