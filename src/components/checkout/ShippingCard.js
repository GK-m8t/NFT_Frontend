import {useEffect, useState} from "react";
import styles from "src/styles/pages/checkout.module.css";
import {useFormik} from 'formik';
import {validationSchema} from './ShippingValidationSchema';
import ShippingNameAndEmail from './ShippingNameAndEmail';
import ShippingAddress from './ShippingAddress';
import ShippingCountry from './ShippingCountry';
import ShippingConfirmOrEdit from './ShippingConfirmOrEdit';
import ShippingReviseAddressModal from "./ShippingReviseAddressModal";
import UITexts from "src/constants/interfaceText/checkout.json";
import {createOrder, updateOrder} from "src/services";
import {failToast, successToast} from "src/components/toasts";
import {useUserAuthContext, useUserDataContext} from "src/hooks";
import {useAccount} from "wagmi";

const ShippingCard = ({ isShippingConfirmed, orderDetails, setIsShippingConfirmed, setOrderDetails }) => {
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [reviseModalData, setReviseModalData] = useState();
  const { signedMessage, unsignedMessage, checkVerification } = useUserAuthContext();
  const { selectedTokenId } = useUserDataContext();
  const { address } = useAccount();
  const toastMessages = UITexts.toast;

  const initialValues = {
    name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    PIN: "",
    country: ""
  };

  useEffect(() => {
    resetFromValues()
  }, [orderDetails])

  const resetFromValues = () => {
    console.log('orderDetails--', orderDetails)

    if (orderDetails) {
      formik.resetForm({
        values: {
          name: orderDetails.shipping.name,
          email: orderDetails.shipping.email,
          address1: orderDetails.shipping.address.street1,
          address2: orderDetails.shipping.address.street2 !== null ? orderDetails.shipping.address.street2 : "",
          city: orderDetails.shipping.address.city,
          state: orderDetails.shipping.address.state,
          PIN: orderDetails.shipping.address.zip,
          country: orderDetails.shipping.address.country
        }
      });
    }
  }

  const handleConfirmShipping = async (values) => {
    // console.log("values-", values);
    const isVerifiedMessage = checkVerification()
    if (!isVerifiedMessage) {
      return
    }

    setIsFetchingData(true)
    try {
      const credential = {
        signer: JSON.stringify({ address }),
        certificate: JSON.stringify(unsignedMessage),
        signature: signedMessage,
      }
      const shipping = {
        //tokenId: selectedToken.tokenId,
        tokenId:selectedTokenId,
        account: { address },
        shipping: {
          name: values.name,
          email: values.email,
          address: {
            street1: values.address1,
            street2: values.address2,
            city: values.city,
            state: values.state,
            zip: values.PIN,
            country: values.country,
          },
          _phone: null,
        }
      }
      let res;
      if (isEditModeOn) {
        res = await updateOrder(selectedTokenId, shipping, credential)
      } else {
        res = await createOrder(selectedTokenId, shipping, credential)
      }
      console.log('res--', res)
      if (res.code === "OK") {
        successToast(toastMessages.success.createRequest)
        setOrderDetails(res.data)
        setIsShippingConfirmed(true);
        setIsEditModeOn(false)
        setIsFetchingData(false)
      } else if (res.code === "SUSPEND") {
        setReviseModalData(res.data)
        setIsShippingConfirmed(false);
      } else if (res.code === "ERROR") {
        setIsShippingConfirmed(false);
        setIsFetchingData(false);
        if (res.error.includes("AddrValError")){
          failToast(toastMessages.error.createRequest.invalidAddress)
        } else {
          failToast(toastMessages.error.createRequest.default)
        }
      } else {
        setIsShippingConfirmed(false);
        setIsFetchingData(false)
        failToast(toastMessages.error.createRequest.default)
      }
    } catch (e) {
      console.log('error:', e)
      failToast(toastMessages.error.createRequest)
      // failToast(e.message)
      setIsFetchingData(false)
      setIsShippingConfirmed(false);
      setIsEditModeOn(false)
    }

  };

  const handleEdit = () => {
    setIsEditModeOn(true)
    setIsShippingConfirmed(false)
  }

  const handleCancelEdit = () => {
    setIsEditModeOn(false)
    setIsShippingConfirmed(true)
  }

  const handleClose = () => {
    setReviseModalData()
    // setIsEditModeOn(true)
    setIsFetchingData(false)
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:handleConfirmShipping,
  });

  const handleUpdateAddress = () => {
    formik.setValues({
      ...formik.values,
      address1: reviseModalData.street1,
      address2: reviseModalData.street2 !== null ? reviseModalData.street2 : "",
      city: reviseModalData.city,
      state: reviseModalData.state,
      PIN: reviseModalData.zip,
      country: reviseModalData.country,
    });
    formik.handleSubmit();
    handleClose()
  }

  return (
    <>
      <div className={styles.formDiv + " flex flex-col items-left"}>
        <h3 className="card_title">{UITexts.shipping.title}</h3>
        <div className={styles.form}>
          <form>
            <ShippingNameAndEmail formik={formik} isShippingConfirmed={isShippingConfirmed}
                                  isFetchingData={isFetchingData}/>
            <ShippingCountry formik={formik} isShippingConfirmed={isShippingConfirmed} isFetchingData={isFetchingData}/>
            <ShippingAddress formik={formik} isShippingConfirmed={isShippingConfirmed} isFetchingData={isFetchingData}/>
          </form>
          <ShippingConfirmOrEdit formik={formik}
                                 isFetchingData={isFetchingData}
                                 isShippingConfirmed={isShippingConfirmed}
                                 isEditModeOn={isEditModeOn}
                                 handleCancelEdit={handleCancelEdit}
                                 resetFromValues={resetFromValues}
                                 handleEdit={handleEdit}/>
        </div>
      </div>
      <ShippingReviseAddressModal reviseModalData={reviseModalData} onClose={handleClose}
                                  onUpdate={handleUpdateAddress}/>
    </>
  )
}

export default ShippingCard;
