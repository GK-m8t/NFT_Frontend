import styles from "src/styles/pages/checkout.module.css";
import {useEffect, useState} from "react";
import {createSession} from "src/services";
import {useUserAuthContext, useUserDataContext} from "src/hooks";
import {useAccount} from "wagmi";
import {failToast} from "src/components/toasts";
import UITexts from "src/constants/interfaceText/checkout.json";

const PaymentCard = ({ isShippingConfirmed, orderDetails }) => {
  const paymentTexts = UITexts.payment;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentTexts.paymentMethods[0]);
  const [tokenPrices, setTokenPrices] = useState([0, 0, 0]);
  const [isPaying, setIsPaying] = useState(false);
  const { address } = useAccount();
  const { signedMessage, unsignedMessage, checkVerification } = useUserAuthContext();


  useEffect(() => {
    fetchCost()
  }, [orderDetails]);

  const fetchCost = () => {
    if (orderDetails) {
      const shipping = orderDetails.cost.ship
      const print = orderDetails.cost.print
      let prices = [print, shipping, print + shipping];
      setTokenPrices(prices)
    }
  }

  const handlePay = async () => {
    const isVerifiedMessage = checkVerification()
    if (!isVerifiedMessage) {
      return
    }
    setIsPaying(true)
    try {
      const credential = {
        signer: JSON.stringify({ address }),
        certificate: JSON.stringify(unsignedMessage),
        signature: signedMessage,
      }
      const res = await createSession(orderDetails.tokenId, credential, selectedPaymentMethod);
      if (res.code === "OK") {
        window.location.href = res.data.url;
        setIsPaying(false)
      } else {
        failToast(UITexts.toast.error.createSession)
        setIsPaying(false)
      }
    } catch (e) {
      console.log('error:', e)
      failToast(UITexts.toast.error.createSession)
      setIsPaying(false)
      // failToast(e.message)
    }
  };

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const PaymentItem = ({ item, price }) => {
    return (
      <p>
        {item} <span> {price === 0 ? '-' : `$${price.toFixed(2)}`} </span>
      </p>
    );
  };

  const PaymentMethod = ({ option }) => {
    return (
      <label className={styles.radioLabel}>
        <input
          className="radioInput"
          id='payment'
          type="radio"
          name="payment"
          value={option}
          checked={selectedPaymentMethod == option}
          onChange={handlePaymentMethodChange}
        />
        {paymentTexts.paymentMethodLabels[option]}
      </label>
    );
  };

  return (
    <div className={`flex flex-col justify-start gap-0 ${styles.costDetails}`}>
      <h3 className="card_title">{paymentTexts.title}</h3>
      <div className={styles.priceDiv}>
        {paymentTexts.paymentItems.map((item, index) => (
          <PaymentItem item={item} price={tokenPrices[index]}/>
        ))}
      </div>
      <p className="subTitle">{paymentTexts.subTitle} </p>
      <form className="flex flex-col my-4 gap-2">
        {paymentTexts.paymentMethods.map((option) => (
          <PaymentMethod option={option}/>
        ))}
      </form>
      <div className={`flex items-center gap-8 ${styles.paymentButtons}`}>
        <button
          disabled={!isShippingConfirmed || isPaying}
          onClick={handlePay}
          className={`${styles.shippingConfirm_Button} ${isPaying && styles.shippingLoader_btn}`}
          data-cy="pay"
        >
          {isPaying ? <div className="dot-elastic"></div> : paymentTexts.button}
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
