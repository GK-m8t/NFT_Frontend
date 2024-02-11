import {useState, useEffect} from "react";
import {useAccount, useNetwork} from "wagmi";
import styles from "src/styles/pages/checkout.module.css";

import UITexts from "src/constants/interfaceText/checkout.json";

import {Title, Loader, SwitchNetwork, SignMessage, Subtitle} from "src/components/common";
import {
  ShippingCard,
  PaymentCard,
} from "src/components/checkout";

import {useNetworkConnectionContext, useUserAuthContext, useUserDataContext} from "src/hooks";
import {getOrder} from "src/services";

export default function Checkout() {
  const { address, isConnected } = useAccount();
  console.log('rend');

  const { chain } = useNetwork();
  const { selectedTokenId } = useUserDataContext();
  const { signedMessage, unsignedMessage, isAuthenticate, checkVerification } = useUserAuthContext();
  const { isInCorrectNetwork } = useNetworkConnectionContext()

  const [isLoading, setIsLoading] = useState(false);
  const [isShippingConfirmed, setIsShippingConfirmed] = useState(false);
  const [orderDetails, setOrderDetails] = useState();

  useEffect(() => {
    checkVerification();
  }, [isConnected, address, chain]);

  useEffect(() => {
      console.log('selected token '+selectedTokenId);
    if (isAuthenticate && selectedTokenId) {
      fetchUserTokenData()
    }
  }, [isAuthenticate, selectedTokenId]);

  const fetchUserTokenData = async () => {
    const credential = {
      signer: JSON.stringify({ address }),
      certificate: JSON.stringify(unsignedMessage),
      signature: signedMessage,
    }
    try {
      console.log('selected token '+selectedTokenId);
      const tokenDataRes = await getOrder(selectedTokenId, credential);
      console.log('tokenDataRes for get order--', tokenDataRes)
      if (tokenDataRes.code === 'OK') {
        setOrderDetails(tokenDataRes.data);
        setIsShippingConfirmed(true);
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div className={styles.div}>
        <Title title={UITexts.title} buttonText={UITexts.buttonText}/>
        {
          isInCorrectNetwork ? (
            <SwitchNetwork/>
          ) : !isAuthenticate ? (
            <SignMessage/>
          ) : (
            <>
              <Subtitle subTitle={UITexts.subTitle}/>
              <div className="grid xl:grid-cols-checkout md:grid-cols-checkout gap-6 my-2">
                <ShippingCard
                  isShippingConfirmed={isShippingConfirmed}
                  orderDetails={orderDetails}
                  setOrderDetails={setOrderDetails}
                  setIsShippingConfirmed={setIsShippingConfirmed}
                />
                <PaymentCard orderDetails={orderDetails} isShippingConfirmed={isShippingConfirmed}/>
              </div>
            </>
          )}
      </div>
    </>
  );
}
