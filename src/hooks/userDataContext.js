import React, {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useAccount} from "wagmi";

const UserDataContext = createContext();

export function UserDataContextProvider({ children }) {
  const [userTokens, setUserTokens] = useState([]);
  const [selectedTokenId, setSelectedTokenId] = useState();
  const router = useRouter();
  const { address } = useAccount();

  useEffect(() => {
    setUserTokens([])
  }, [address]);

  useEffect(() => {
    getSelectedTokenId()
  }, []);

  const getSelectedTokenId = () => {
    const storedTokenId = localStorage.getItem('selectedTokenId');
    console.log('storedTokenId--', storedTokenId)
    if (storedTokenId) {
      const parsedTokenId = JSON.parse(storedTokenId);
      console.log('parsedTokenId--', parsedTokenId)
      setSelectedTokenId(parsedTokenId)
    } else {
      if (router.pathname === '/checkout' || router.pathname === '/status') router.push('/dashboard')
    }
  }


  return (
    <UserDataContext.Provider value={{
      userTokens,
      setUserTokens,
      selectedTokenId,
      setSelectedTokenId
    }}>
      {children}
    </UserDataContext.Provider>
  )
}

export const useUserDataContext = () => useContext(UserDataContext);
