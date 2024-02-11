import {multicall, readContract} from "@wagmi/core";

import appConfig from "src/constants/app.config.json";
import tokenABI from "src/web3/abi/ERC721A.json";
import serverCodes from "../../constants/serverCodes.json";
import UITexts from "../../constants/interfaceText/admin.json";

const tokenContract = {
  address: appConfig.tokenContractAddress,
  abi: tokenABI,
};

export const getPrintStatus = async (tokenId) => {
  try {
    const status = await readContract({
      ...tokenContract,
      functionName: "printStatus",
      args: [tokenId],
    });
    return Number(status);
  } catch (error) {
    console.log(error)
  }
};

export const getPrintStatuses = async (orders) => {
  try {
    var requests = [];
    const holders = [];
    console.log('orders--', orders)
    for (let i = 0; i < orders.length; i++) {
      requests.push({
        ...tokenContract,
        functionName: "printStatus",
        args: [orders[i].tokenId.toString()],
      });

      const response = await multicall({ contracts: requests });
      holders.push({
        ...orders[i],
        contractStatus: appConfig.contractStatusCodes[response[0].result.toString()],
        paymentStatus: 
          orders[i].payment === null && orders[i].status === null
            ? "Payment not initiated"
            : orders[i].payment && orders[i].status.payment === serverCodes.paymentStatus.pending
            ? "Payment Pending"
            : orders[i].payment && orders[i].status.payment === serverCodes.paymentStatus.completed
            ? "Payment Completed"
            : orders[i].payment && orders[i].status.payment === serverCodes.paymentStatus.delayed
            ? "Payment Delayed"
            : "Payment Expired",
        dbStatus: orders[i].status === null ||
        (orders[i].status.payment === null && orders[i].status.shipping === null)
          ? "Not requested"
          : serverCodes.paymentStatus.pending === orders[i].status.payment
            ? "Payment pending"
            : UITexts.statusCodes[orders[i].status.shipping]
      });
      requests = [];

    }
    return holders;
  } catch (error) {
    console.log(error);
  }
};

