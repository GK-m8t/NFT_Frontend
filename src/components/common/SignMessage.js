import {useSignMessage} from "wagmi";
import {useUserAuthContext} from "src/hooks";
import config from "src/constants/app.config.json";
import UITexts from "src/constants/interfaceText/signMessage.json";
import {Subtitle} from "./index";

 const SignMessage = () => {
  const { setUnsignedMessage, setSignedMessage,setIsAuthenticate } = useUserAuthContext();

  const { signMessage } = useSignMessage({
    onSuccess(data, variables) {
      localStorage.setItem('unsignedMessage', variables.message);
      localStorage.setItem('signedMessage', JSON.stringify(data));
      setSignedMessage(data)
      setUnsignedMessage(JSON.parse(variables.message));
      setIsAuthenticate(true)
    },
  })

  const handleSign = () => {
    const message = JSON.stringify({ timestamp: new Date(), data: config.authMessage });
    signMessage({ message: message, });
  }

  return (
    <>
      <Subtitle subTitle={UITexts.subTitle}/>
      <button data-cy="sign" className="networkSwitchButton" onClick={handleSign}>
        {UITexts.button}
      </button>
    </>
  )
}

export default SignMessage;
