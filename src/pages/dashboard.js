/*
 * `loadUserTokens()` retrieves the user's 3D printable token information
 * by first obtaining their token IDs and the contract baseURI from
 * the blockchain using `getUserTokenIds()` and `getBaseURI()`.
 * Then, it fetches the metadata for each token by calling `getTokenMetadata()`
 * using the respective baseURIs.
 */

import {useState, useEffect} from "react";
import {useAccount, useNetwork} from "wagmi";
import UITexts from "src/constants/interfaceText/dashboard.json";
import InfiniteScroll from "react-infinite-scroll-component"; // Import the InfiniteScroll component
import {fetchUserTokens} from "src/services";
import {useNetworkConnectionContext, useUserDataContext, useUserAuthContext} from "src/hooks";
import {Loader, SignMessage, SwitchNetwork, Subtitle, Title} from "src/components/common";
import {TokenCard} from "src/components/dashboard";
import {displayDummyData} from "../helper";

export default function Dashboard() {
  const { address, isConnected } = useAccount();

  const { chain } = useNetwork();
  const { userTokens, setUserTokens, } = useUserDataContext();
  const { signedMessage, unsignedMessage, isAuthenticate, checkVerification } = useUserAuthContext();
  const { isInCorrectNetwork } = useNetworkConnectionContext()

  const [isLoading, setIsLoading] = useState(false);
  const [isDataFetching, setIsDataFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if there are more tokens to load
  const [visibleTokens, setVisibleTokens] = useState([]); // State for the tokens currently visible
  const tokensPerPage = 4; // Adjust the number of tokens to load on each scroll

  useEffect(() => {
    getUserTokens()
  }, [signedMessage, address, isConnected, chain]);

  const getUserTokens = async (isRefetch) => {
    try {
      const isVerifiedMessage = checkVerification()
      console.log('isVerifiedMessage--', isVerifiedMessage)
      if (!isVerifiedMessage) {
        return
      }

      // if (!isRefetch && userTokens.length) {
      //   return;
      // }

      // setIsLoading(true)
      setIsDataFetching(true)
      setVisibleTokens(displayDummyData(4));
      const userTokenData = await fetchUserTokens(address, signedMessage, unsignedMessage);
      setUserTokens(userTokenData);
      // Update the visibleTokens state with the initial tokens to display
      setVisibleTokens(userTokenData.slice(0, tokensPerPage));
      if(isRefetch){
        setHasMore(tokensPerPage < userTokens.length);
      }
    } catch (error) {
      console.log(error);
    }
    setIsDataFetching(false)
    setIsLoading(false)
  }

  // Function to load more tokens when the user scrolls down
  const loadMoreTokens = () => {
    // Determine the next set of tokens to display
    const nextTokens = userTokens.slice(visibleTokens.length, visibleTokens.length + tokensPerPage);
    // Update the visibleTokens state with the new tokens
    setVisibleTokens([...visibleTokens, ...nextTokens]);
    // Check if there are more tokens to load
    setHasMore(visibleTokens.length < userTokens.length);
  };


  return (
    <>
      <div className="dashboard_div">
        <Title title={UITexts.title} buttonText={UITexts.buttonText} handleClick={() => getUserTokens(true)}/>
        {isLoading ? (
          <Loader loading={isLoading}/>
        ) : isInCorrectNetwork ? (
          <SwitchNetwork/>
        ) : !isAuthenticate ? (
          <SignMessage/>
        ) : visibleTokens.length===0 && userTokens.length === 0 ? (
          <p className="subTitle">{UITexts.noTokens}</p>
        ) : (
          <>
            <Subtitle subTitle={UITexts.subTitle}/>
            <InfiniteScroll
              dataLength={visibleTokens.length} // This is important to prevent reloading the same tokens when scrolling
              next={loadMoreTokens} // Function to call when scrolling down
              hasMore={hasMore} // Boolean to indicate if there are more items to load
              loader={<Loader loading={true} />}
            >
            <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6 mt-2 mb-10">
              {visibleTokens.map((token, index) => (
                <TokenCard token={token} index={index} isDataFetching={isDataFetching}/>
              ))}
            </div>
            </InfiniteScroll>
          </>
        )}
      </div>
    </>
  );
}
