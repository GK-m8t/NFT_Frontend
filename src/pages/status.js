import {useEffect, useState} from "react";
import UITexts from "src/constants/interfaceText/status.json";
import serverCodes from "src/constants/serverCodes.json";
import {Loader, SwitchNetwork, Title, Subtitle, SignMessage} from "src/components/common";
import {useRouter} from "next/router";
import {useAccount, useNetwork} from "wagmi";
import {useNetworkConnectionContext, useUserAuthContext, useUserDataContext} from "src/hooks";
import {getOrder, getPrintStatus} from "src/services";

export default function Status() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [loading, setLoading] = useState(false);
  const { isInCorrectNetwork } = useNetworkConnectionContext()
  const { selectedTokenId } = useUserDataContext();
  const [orderDetails, setOrderDetails] = useState();
  const { signedMessage, unsignedMessage, isAuthenticate, checkVerification } = useUserAuthContext();
  const [contractStatus, setContractStatus] = useState('');

  useEffect(() => {
    checkVerification();
  }, [isConnected, address, chain]);

  useEffect(() => {
    if (isAuthenticate && selectedTokenId) {
      fetchTokenStatusData()
    }
  }, [isAuthenticate, selectedTokenId]);

  const fetchTokenStatusData = async () => {
    setLoading(true)
    const credential = {
      signer: JSON.stringify({ address }),
      certificate: JSON.stringify(unsignedMessage),
      signature: signedMessage,
    }
    try {
      const scStatus = await getPrintStatus(selectedTokenId);
      setContractStatus(UITexts.contractStatusCodes[scStatus.toString()])
      const tokenDataRes = await getOrder(selectedTokenId, credential);
      console.log('tokenDataRes--', tokenDataRes)
      if (tokenDataRes.code === 'OK') {
        setOrderDetails(tokenDataRes.data);
      }
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  const statuses = UITexts.status;

  let printStatus = "";

  if (orderDetails?.message === "Request doesn't exist") {
    printStatus = statuses.notRequested
  } else if (orderDetails?.status === null) {
    printStatus = statuses.requested;
  } else if (orderDetails?.status.payment === serverCodes.paymentStatus.pending) {
    console.log('pending ' + orderDetails.tokenId, statuses.pending);
    printStatus = statuses.pending;
  } else if (orderDetails?.status.payment === serverCodes.paymentStatus.completed) {
    printStatus = statuses.completed;
    console.log('completed ' + orderDetails.tokenId, statuses.completed);
  } else if (orderDetails?.status.payment === serverCodes.paymentStatus.delayed) {
    printStatus = statuses.delayed;
    console.log('delayed ' + orderDetails.tokenId, statuses.delayed);
  } else {
    printStatus = statuses.expired
  }

  let paymentURL;
  let method;

  if (orderDetails?.payment?.method === serverCodes.paymentMethod.card) {
    method = "Credit Card"
    paymentURL = orderDetails?.payment?.session?.url
  } else {
    method = "Crypto"
    paymentURL = orderDetails?.payment?.session?.hosted_url
  }

  const shipAddress = orderDetails?.shipping?.address
  return (
    <>
      <div className="status_main_div">
        <Title title={UITexts.title} buttonText={UITexts.buttonText}/>
        {loading ? (
          <Loader loading={loading}/>
        ) : isInCorrectNetwork ? (
          <SwitchNetwork/>
        ) : !isAuthenticate ? (
          <SignMessage/>
        ) : (
          <>
            <Subtitle subTitle={UITexts.subTitle}/>
            <div className='flex flex-col justify-start'>
              <h3 className="card_title cardTitle">
                Token {selectedTokenId}
              </h3>
              <div className='statusDiv'>
                {orderDetails !== undefined && (
                  <>
                    <p className='data_row'>
                      {UITexts.cardKeys.name}
                      <span className='data_info'>{orderDetails.shipping.name}</span>
                    </p>
                    <p className='data_row'>
                      {UITexts.cardKeys.email}
                      <span className='data_info'>{orderDetails.shipping.email}</span>
                    </p>
                    <p className='data_row'>
                      {UITexts.cardKeys.address}
                      <span className='data_info'>
                        {shipAddress.street1},{" "}
                        {shipAddress.city}, {shipAddress.state},{" "}
                        {shipAddress.country}-{shipAddress.zip}.
                      </span>
                    </p>
                  </>
                )}
                {orderDetails?.status?.payment ===
                serverCodes.paymentStatus.pending && (
                  <>
                    <p className="data_row">
                      {UITexts.cardKeys.method}
                      <span className="data_info">{method}</span>
                    </p>
                    <p className="data_row">
                      {UITexts.cardKeys.link}
                      <span className="data_info">
                    <a className='payment_link'
                       href={paymentURL}>{paymentURL}</a>
                      </span>
                    </p>
                  </>
                )}
                <p className="data_row">
                  {UITexts.cardKeys.status}
                  <span className="data_info payment_status fwBold">
                    {contractStatus === UITexts.contractStatusCodes["0"] || contractStatus === UITexts.contractStatusCodes["1"] ? printStatus : contractStatus}
                  </span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}