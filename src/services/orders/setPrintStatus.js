import {writeContract, waitForTransaction} from "@wagmi/core";

import appConfig from "src/constants/app.config.json";
import tokenABI from "src/web3/abi/ERC721A.json";

const tokenContract = {
  address: appConfig.tokenContractAddress,
  abi: tokenABI,
};

export const setPrintStatus = async (tokenId, status) => {
  try {
    const statusId = appConfig.printStatusMapping[status]
    console.log(statusId)
    const { hash } = await writeContract({
      ...tokenContract,
      functionName: "setPrintStatus",
      args: [tokenId, statusId],
    });
    const response = await waitForTransaction({
      hash,
    });
    return response;
  } catch (error) {
    console.log('err---',error)
    return error.details;
  }
};