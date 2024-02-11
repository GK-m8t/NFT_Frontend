import React, {createContext, useContext, useEffect, useState} from "react";
import appConfig from "src/constants/app.config.json";
import {useAccount, useNetwork} from "wagmi";
import {useRouter} from "next/router";

const NetworkConnectionContext = createContext();

export function NetworkConnectionContextProvider({children}) {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const router = useRouter();
  const [isInCorrectNetwork, setIsInCorrectNetwork] = useState(false);


  const verifyBlockchainConnection = async () => {
    if (isConnected && chain.id === appConfig.chainId) {
      setIsInCorrectNetwork(false);
    } else if (!isConnected) {
      router.push("/");
    } else {
      setIsInCorrectNetwork(true);
    }
  };

  useEffect(() => {
    verifyBlockchainConnection();

  }, [isConnected, chain]);



  return (
    <NetworkConnectionContext.Provider value={{
      isInCorrectNetwork
    }}>
      {children}
    </NetworkConnectionContext.Provider>
  )
}

export const useNetworkConnectionContext = () => useContext(NetworkConnectionContext);