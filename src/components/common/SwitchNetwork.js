import {useSwitchNetwork} from "wagmi";
import appConfig from "src/constants/app.config.json";
import UITexts from "src/constants/interfaceText/switchNetwork.json";
import {Subtitle} from "./index";

const SwitchNetwork = () => {
  const { switchNetwork } = useSwitchNetwork();

  return (
    <>
      <Subtitle subTitle={UITexts.subTitle}/>
      <button
        className="networkSwitchButton"
        onClick={() => {
          switchNetwork?.(appConfig.chainId);
        }}
      >
        {UITexts.button}
      </button>
    </>
  );
};

export default SwitchNetwork;
