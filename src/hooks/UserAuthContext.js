import React, {createContext, useContext, useEffect, useState} from "react";
import {useAccount} from "wagmi";
import {useRouter} from "next/router";
import config from "src/constants/app.config.json";
import {verifyMessage} from "ethers";


const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [signedMessage, setSignedMessage] = useState("");
  const [unsignedMessage, setUnsignedMessage] = useState();
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const { address: walletAddress } = useAccount();
  const router = useRouter();

  useEffect(() => {
    checkSignedMessage()
  }, [walletAddress]);

  const checkSignedMessage = () => {
    const storedSignature = localStorage.getItem('signedMessage');
    const storedUnsignedMessage = localStorage.getItem('unsignedMessage');
    if (storedSignature && storedUnsignedMessage) {
      const parsedSignature = JSON.parse(storedSignature);
      const parsedUnsignedMessage = JSON.parse(storedUnsignedMessage);

      if (parsedSignature && Date.now() >= parsedUnsignedMessage.timestamp + config.expirationTime*1000) {
        localStorage.removeItem('signedMessage')
        localStorage.removeItem('unsignedMessage')
        setIsAuthenticate(false)
      } else {
        setSignedMessage(parsedSignature)
        setUnsignedMessage(parsedUnsignedMessage)
        setIsAuthenticate(true)
      }
    }
  }

  const checkVerification = () => {
    try {
      const recoveredAddress = verifyMessage(JSON.stringify(unsignedMessage), signedMessage);
      const isMessageVerified = recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
      console.log('isMessageVerified--', isMessageVerified)
      if (!isMessageVerified) {
        setIsAuthenticate(false)
        localStorage.removeItem('selectedTokenId')
        router.push('/dashboard')
      }
      const signatureAge = Date.now() - new Date(unsignedMessage.timestamp).valueOf()
      if (signedMessage !== "" && (!isMessageVerified || signatureAge >= config.expirationTime*1000)) {
        localStorage.removeItem('signedMessage')
        localStorage.removeItem('unsignedMessage')
        setIsAuthenticate(false)
        setSignedMessage('')
        setUnsignedMessage()
        return false
      }
      setIsAuthenticate(true)
      return true
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserAuthContext.Provider value={{
      signedMessage,
      setSignedMessage,
      unsignedMessage,
      setUnsignedMessage,
      isAuthenticate,
      setIsAuthenticate,
      checkVerification
    }}>
      {children}
    </UserAuthContext.Provider>
  )
}

export const useUserAuthContext = () => useContext(UserAuthContext);
