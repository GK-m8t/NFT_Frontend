import {useState, useEffect} from "react";
import {WagmiConfig} from "wagmi";
import {NetworkConnectionContextProvider,UserAuthContextProvider, UserDataContextProvider} from "src/hooks";

import "src/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import {
  wagmiConfig
} from "src/services/tokens/web3ClientInit";

import {Layout} from "src/components/common";

export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <NetworkConnectionContextProvider>
            <UserDataContextProvider>
              <UserAuthContextProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              </UserAuthContextProvider>
            </UserDataContextProvider>
          </NetworkConnectionContextProvider>
        </WagmiConfig>
      ) : null}
    </>
  );
}
