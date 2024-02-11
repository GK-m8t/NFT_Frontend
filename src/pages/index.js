/* 
  checkAccountConnected() verifies if the user has connected their account and directs them to the "my-printable" page if so.

  onConnect() is a built-in function in the Wagmi useAccount hook. It handles the routing to the "my-printable" page upon successful wallet connection.

  handleConnectWallet() triggers a custom loader while waiting for the useWeb3Modal hook from Web3modal to initiate the wallet connection process.
*/
import {useRouter} from "next/router";
import {useState, useEffect} from "react";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import {useAccount} from "wagmi";

import UITexts from "src/constants/interfaceText/index.json";
import {Subtitle, Title} from "src/components/common";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log("Connected", { address, connector, isReconnected });
      router.push("/dashboard");
    },
  });

  const checkAccountConnected = () => {
    if (isConnected) {
      router.push("/dashboard");
    }
  };

  async function handleConnectWallet() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  useEffect(() => {
    checkAccountConnected();
  }, []);

  return (
    <div className="connect_div">
      <Title title={UITexts.title}/>
      <Subtitle subTitle={UITexts.subTitle}/>
      <button
        data-cy="connect"
        onClick={handleConnectWallet}
        disabled={loading}
        className='connectButton'
      >
        {UITexts.button}
      </button>
    </div>
  );
}
