import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import UITexts from "src/constants/interfaceText/dashboard.json";
import serverCodes from "src/constants/serverCodes.json";
import {useUserDataContext} from "src/hooks";
import {LocalLoader} from "src/components/common";

const TokenCard = ({ token, index,isDataFetching }) => {
  const [isVideoFetching, setIsVideoFetching] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const { setSelectedTokenId } = useUserDataContext();
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  console.log('token ' + token.tokenId, token)

  const statuses = UITexts.card.status;

  let printStatus = "";

  console.log('status ' + token.tokenId, token.status);
  if (token?.message === "Request doesn't exist") {
    printStatus = statuses.notRequested
  } else if (token?.status === null) {
    printStatus = statuses.requested;
  } else if (token?.status.payment === serverCodes.paymentStatus.pending) {
    console.log('pending ' + token.tokenId, statuses.pending);
    printStatus = statuses.pending;
  } else if (token?.status.payment === serverCodes.paymentStatus.completed) {
    printStatus = statuses.completed;
    console.log('completed ' + token.tokenId, statuses.completed);
  } else if (token?.status.payment === serverCodes.paymentStatus.delayed) {
    printStatus = statuses.delayed;
    console.log('delayed ' + token.tokenId, statuses.delayed);
  } else {
    printStatus = statuses.expired
  }

  const handlePrintOrStatus = () => {
    localStorage.setItem('selectedTokenId', JSON.stringify(token.tokenId));
    setSelectedTokenId(token.tokenId);
    if (printStatus === statuses.notRequested || printStatus === statuses.requested || printStatus === statuses.expired) {
      router.push("/checkout");
    } else {
      router.push("/status");
    }
  }

  return (
    <div
      key={index}
      className={`transition ${isVisible ? "visible" : ""}`}
    >
      <h3 className="card_title">{isDataFetching ? <LocalLoader/> : token.name}</h3>
      <div className="card">
        <div className="flex flex-col items-center video_wrapper">
          <div className={`loading ${isVideoFetching === false && "hide"}`}></div>
          <video
            autoPlay
            src="tokenLogo.mp4"
            // height="183"
            onLoadedData={() => setIsVideoFetching(false)}
            playsInline
            muted
            controlsList="nodownload"
            preload="metadata"
            loop
            className={`nftIcon ${isVideoFetching && "hide"}`}
          />
        </div>
        <p className="nftTokenDescription nftTokenStatus">
          {isDataFetching ? <LocalLoader /> : printStatus}
        </p>
        <div className="flex justify-center">
          <button
            className="nftButton my-4 flex items-center justify-center"
            data-cy="print"
            onClick={handlePrintOrStatus}
          >
            {isDataFetching ? <LocalLoader/>: (printStatus === statuses.notRequested || printStatus === statuses.requested || printStatus === statuses.expired)
              ? UITexts.card.button.print
              : UITexts.card.button.status
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
