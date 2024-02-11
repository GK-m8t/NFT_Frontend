import {useUserAuthContext} from "src/hooks";
import {useEffect, useState} from "react";
import config from "src/constants/app.config.json";
import UITexts from "src/constants/interfaceText/signTimer.json";

 const SignTimer = () => {
  const { signedMessage, unsignedMessage} = useUserAuthContext();

  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    let timer;

    if (signedMessage && unsignedMessage) {
      const signatureExpiry = new Date(unsignedMessage.timestamp);
      signatureExpiry.setSeconds(
        signatureExpiry.getSeconds() + config.expirationTime
      );

      // Calculate remaining time
      const calculateRemainingTime = () => {
        const now = Date.now();
        const difference = signatureExpiry - now;

        if (difference > 0) {
          const hours = String(Math.floor(difference / (1000 * 60 * 60))).padStart(2, '0');
          const minutes = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
          const seconds = String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0');
          setRemainingTime(`${hours} : ${minutes} : ${seconds}`);
        } else {
          setRemainingTime("");
          clearInterval(timer);
        }
      };

      // Update the remaining time every second
      timer = setInterval(calculateRemainingTime, 1000);
      calculateRemainingTime(); // Initial calculation
    }

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [signedMessage, unsignedMessage]);


  return (
    <>
      <button 
          className={signedMessage ? "expiryButton" : "noExpiryDetails"}
          disabled
        >
          <span style={{ fontSize: '12px' }}>{remainingTime?UITexts.timer:""}</span>
          {remainingTime?<br/>:UITexts.expired}
          <span>{remainingTime}</span>
      </button>
    </>
  )
}

export default SignTimer;
