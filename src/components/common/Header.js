import styles from "src/styles/components/header.module.css";
import {useAccount, useDisconnect} from "wagmi";
import {useRouter} from "next/router";
import {SignTimer} from "src/components/common";
// import {useNetworkConnectionContext, useUserAuthContext} from "../../hooks";

const Header = ({isDesktop}) => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const noIconRedirectPath=["/dashboard","/admin"]

  const { disconnect } = useDisconnect({
    onSuccess(data) {
      console.log('Success', data)
    },
  })
  const handleDashboardRedirect = () => {
    if(!noIconRedirectPath.includes(router.pathname&&isDesktop)){
      noIconRedirectPath.includes(router.pathname)
      router.push("/dashboard");
    }
  }
  return (
    <>
      <header className={styles.header}>
        <div className={styles.icon}>
          <a>
            <img
              className={!noIconRedirectPath.includes(router.pathname)&&isDesktop?styles.dashboardRedirectionIcon:""}
              src="https://assets.nicepagecdn.com/9adba478/5546901/images/WagmiGAMESLogojune23.png"
              alt="Header Icon"
              onClick={handleDashboardRedirect}
            />
          </a>
          <p className={styles.nftFooter}>
            Powered by{" "}
            <img
              src="/3dh-circle-white.png"
              alt="Header Icon"
              width="18"
              style={{ marginLeft: "5px" }}
            />
          </p>
        </div>
        <div className={isConnected&&isDesktop ? styles.accountDetails : styles.noAccountDetails}>
          <SignTimer/>
          <button
            className={styles.accountButton}
            onClick={() => {
              disconnect();
            }}
          >
            <span>{isConnected ? address.slice(0, 4) + "..." + address.slice(-4) : ""}</span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
